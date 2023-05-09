import ProductModel from '../products.models.js';

export default class productsDAO {
  async findById(id) {
    const product = await ProductModel.findById(id).exec();
    return product;
  }

  async findByPid(pid) {
    const product = await ProductModel.findOne({ pid }).exec();
    return product;
  }

  async findAll() {
    const products = await ProductModel.find().exec();
    return products;
  }

  async create(productData) {
    const product = new ProductModel(productData);
    const createdProduct = await product.save();
    return createdProduct;
  }

  async update(id, productData) {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      productData,
      { new: true }
    ).exec();
    return updatedProduct;
  }

  async delete(id) {
    const deletedProduct = await ProductModel.findByIdAndDelete(id).exec();
    return deletedProduct;
  }
}
