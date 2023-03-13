import mongoose from "mongoose";

const CartsCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products:[{
    id:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, quantity:Number}]})

const cartModel = mongoose.model(CartsCollection, cartSchema)

export default cartModel;