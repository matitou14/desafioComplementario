import ProductModel from '../models/ProductModel.js';

class ProductRepository {
  async getAllProducts() {
    const products = await ProductModel.find({});
    return products;
  }

  async getProductById(id) {
    const product = await ProductModel.findById(id);
    return product;
  }

  async getProductByCode(code) {
    const product = await ProductModel.findOne({ code });
    return product;
  }

  async createProduct(productData) {
    const newProduct = new ProductModel(productData);
    const createdProduct = await newProduct.save();
    return createdProduct;
  }

  async updateProduct(id, productData) {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, productData, { new: true });
    return updatedProduct;
  }

  async deleteProduct(id) {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    return deletedProduct;
  }
}

export default ProductRepository;
