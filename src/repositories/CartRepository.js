import mongoDAO from '../dao/models/DAO/MongoDAO.js';
import CartModel from '../dao/models/carts.models.js'

export default class CartRepository extends mongoDAO {
  constructor(config) {
    super(config);
    const timestamp = { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } };
    this.cartSchema = this.createSchema(CartModel, timestamp);
    this.CartModel = this.createModel('Cart', this.cartSchema);
  }

  async getCartById(cartId) {
    return this.findById('Cart', cartId);
  }

  async getCartsByUserId(userId) {
    return this.find('Cart', { user_id: userId });
  }

  async createCart(cartData) {
    return this.create('Cart', cartData);
  }

  async updateCart(cartId, cartData) {
    return this.update('Cart', cartId, cartData);
  }

  async deleteCart(cartId) {
    return this.delete('Cart', cartId);
  }
}


