import mongoose from "mongoose";

const CartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
      quantity: { type: Number, default: 1 }
    }
  ]
});

const CartModel = mongoose.model(CartsCollection, cartSchema);

export default CartModel;