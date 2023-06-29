import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const prodCollection = 'products';

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: [String],
  owner: {
    type: String,
    required: true,
    default: 'admin'
  }
});

productSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model(prodCollection, productSchema);

export default ProductModel;

