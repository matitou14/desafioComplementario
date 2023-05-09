import UserDAO from "../dao/models/DAO/UserDao.js";
import { createHash } from "../utils.js";

class UserService {
  constructor() {
    this.userDAO = new UserDAO();
  }

  async getAllUsers() {
    const users = await this.userDAO.getAllUsers();
    return users;
  }

  async getUserById(id) {
    const user = await this.userDAO.getUserById(id);
    return user;
  }

  async createUser(user) {
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
    const createdUser = await this.userDAO.createUser(newUser);
    return createdUser;
  }

  async updateUser(id, user) {
    const updatedUser = await this.userDAO.updateUser(id, user);
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await this.userDAO.deleteUser(id);
    return deletedUser;
  }

  async login(email, password) {
    const user = await this.userDAO.getUserByEmail(email);
    if (!user) {
      return false;
    }
    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      return false;
    }
    return user;
  }
}

export default UserService;
