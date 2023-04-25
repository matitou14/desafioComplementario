import UserModel from '../dao/models/user.models.js'
import {createHash} from '../utils.js'

export const createUser = async (userData) => {
  const userNew = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    age: userData.age,
    email: userData.email,
    password: createHash(userData.password)
  }
  const user = new UserModel(userNew);
  await user.save();
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};

