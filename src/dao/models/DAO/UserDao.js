import { MongoClient } from 'mongodb';
import  UserDTO  from '../DTO/UserDTO.js';

class UserDAO {
    constructor() {
      const uri = process.env.MONGODB_URI;
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      this.db = null;
      this.users = null;
      
      this.connect();
    }
    
    async connect() {
      try {
        await client.connect();
        this.db = client.db();
        this.users = this.db.collection('users');
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
      }
    }
        async createUser(user) {
          const newUser = await User.create(user);
          return new UserDTO(newUser);
        }
      
        async updateUser(id, user) {
          const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
          return new UserDTO(updatedUser);
        }
      
        async deleteUser(id) {
          const deletedUser = await User.findByIdAndDelete(id);
          return new UserDTO(deletedUser);
        }
      
        async getUserById(id) {
          const foundUser = await User.findById(id);
          return new UserDTO(foundUser);
        }
      
        async getAllUsers() {
          const allUsers = await User.find();
          return allUsers.map(user => new UserDTO(user));
        }
      }
      
      export default UserDAO;