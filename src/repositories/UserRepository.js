import UserDAO from "../dao/UserDAO.js";
import UserDTO from "../dao/UserDTO.js";

class UserRepository {
  static async createUser(userDTO) {
    const newUser = await UserDAO.createUser(userDTO);
    return new UserDTO(newUser);
  }

  static async getUserByEmail(email) {
    const user = await UserDAO.getUserByEmail(email);
    return user ? new UserDTO(user) : null;
  }

  static async updateUser(userId, userDTO) {
    const updatedUser = await UserDAO.updateUser(userId, userDTO);
    return new UserDTO(updatedUser);
  }

  static async deleteUser(userId) {
    const deletedUser = await UserDAO.deleteUser(userId);
    return new UserDTO(deletedUser);
  }

  static async getUserById(userId) {
    const user = await UserDAO.getUserById(userId);
    return new UserDTO(user);
  }
}

export default UserRepository;
