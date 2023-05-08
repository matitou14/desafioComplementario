import mongoose from 'mongoose';
import CartModel from '../carts.models.js';
import ProductModel from '../products.models.js';
import UserModel from '../user.models.js';



export default class MongoDAO{
constructor(config) {
  this.mongoose = mongoose.connect(config.MONGO_URI).catch(error => {
    console.log('Error connecting to MongoDB:', error);
   process.exit()
  })
  const timestamp = {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}
  const cartSchema = mongoose.Schema(CartModel.schema, timestamp)
  const productSchema = mongoose.Schema(ProductModel.schema, timestamp)
  const userSchema = mongoose.Schema(UserModel.schema, timestamp)
  this.models = {
    [CartModel.modelName]: mongoose.model(CartModel.modelName, cartSchema),
    [ProductModel.modelName]: mongoose.model(ProductModel.modelName, productSchema),
    [UserModel.modelName]: mongoose.model(UserModel.modelName, userSchema),
  }
}

get = async(options, entity) => {
  if (!this.models[entity]) throw new Error('Entity not found in models')
  let results = await this.models[entity].find(options)
  return results.map(result =>  result.toObject())
}

insert= async(document, entity) => {
  if (!this.models[entity]) throw new Error('Entity not found in models')
  try {
      let instance = new this.models[entity](document)
      let result = await instance.save()
      return result ? result.toObject() : null
  } catch(error) {
      console.log(error)
      return null
  }
}
update = async(id, updateDocument, entity) => {
  if (!this.models[entity]) throw new Error('Entity not found in models')
  try {
    let result = await this.models[entity].findByIdAndUpdate(id, updateDocument, { new: true })
    return result ? result.toObject() : null
  } catch(error) {
    console.log(error)
    return null
  }
}
delete= async(id, entity) => {
  if (!this.models[entity]) throw new Error('Entity not found in models')
  try {
    let result = await this.models[entity].findByIdAndDelete(id)
    return result ? result.toObject() : null
  } catch(error) {
    console.log(error)
    return null
  }
}
}