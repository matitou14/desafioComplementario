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

export function resetPassword(email, newPassword) {
  UserDAO.findOne({ email }, (err, user) => {
    if (err) {
      // Manejar el error de búsqueda del usuario
      console.error(err);
        res.status(500).json({ message: 'Error al buscar el usuario' });
      return;
    }
    if (!user) {  res.status(404).json({ message: 'Usuario no encontrado' });
      return;

  }
  user.password = newPassword;
  user.save((err) => {
    if (err) {
      // Manejar el error al guardar el usuario actualizado
      console.error(err);
    
     res.status(500).json({ message: 'Error al restablecer la contraseña' });
      return;
    }

    // La contraseña se ha restablecido exitosamente
    
    res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
  });
});
}

