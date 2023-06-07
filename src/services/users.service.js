import UserDAO from "../dao/models/DAO/UserDao.js";
import { createHash } from "../utils.js";

export async function getAllUsers() {
  const userDAO = new UserDAO();
  const users = await userDAO.getAllUsers();
  return users;
}

export async function getUserById(id) {
  const userDAO = new UserDAO();
  const user = await userDAO.getUserById(id);
  return user;
}

export async function createUser(user) {
  const userDAO = new UserDAO();
  const passwordHashed = createHash(user.password);
  const newUser = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age,
    password: passwordHashed,
    cart: user.cart,
    role: user.role,
  };
  const createdUser = await userDAO.createUser(newUser);
  return createdUser;
}

export async function updateUser(id, user) {
  const userDAO = new UserDAO();
  const updatedUser = await userDAO.updateUser(id, user);
  return updatedUser;
}

export async function deleteUser(id) {
  const userDAO = new UserDAO();
  const deletedUser = await userDAO.deleteUser(id);
  return deletedUser;
}

export async function login(email, password) {
  const userDAO = new UserDAO();
  const user = await userDAO.getUserByEmail(email);
  if (!user) {
    return false;
  }
  const isValidPassword = await user.verifyPassword(password);
  if (!isValidPassword) {
    return false;
  }
  return user;
}

export const resetPassword = async (userId, password) => {
  try {
    // Buscar el usuario en la base de datos por su ID
    const user = await UserDAO.findById(userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Actualizar la contraseña del usuario
    user.password = password;
    await user.save();

    // Devolver un mensaje de éxito o cualquier otro resultado necesario
    return { success: true, message: 'Contraseña restablecida exitosamente' };
  } catch (error) {
    // Manejar errores
    console.error(error);
    throw new Error('Error al restablecer la contraseña');
  }
};