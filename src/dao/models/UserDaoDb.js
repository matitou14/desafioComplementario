import UserModel from "./user.models";

class UserDaoDb {

    static async createUser (userDtoDb) {
        const newUser = new UserModel(userDtoDb);
        await newUser.save();
        return newUser;
        }

    static async getUserByEmail (email) {
        const user =await UserModel.findOne ({ email });
        return user;
    }    

    static async updateUser (userId, userDTOdb) {
        const updateUser = await UserModel.findByIdAndUpdate(userId, userDTOdb,{
            new: true,
    });
    return updateUser;
    }
    static async deleteUser(userId) {
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        return deletedUser;
      }
    
      static async getUserById(userId) {
        const user = await UserModel.findById(userId);
        return user;
      }
    }
    
    export default UserDaoDb;


