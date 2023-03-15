import mongoose from "mongoose";

const prodCollection = 'products'

const productSchema = new mongoose.Schema({
      id:String,
      title: String, 
      description: String,
      code: String, 
      price: Number, 
      status: Boolean,
      stock: Number,
      category: String, 
      thumbnails: [String],

});

const productModel = mongoose.model(prodCollection, productSchema)

export default productModel;