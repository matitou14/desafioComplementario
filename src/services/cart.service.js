import CartDAO from "../dao/cartDAO.js";

class CartService {
  constructor() {
    this.cartDAO = new CartDAO();
  }

  async getCartById(id) {
    const cart = await this.cartDAO.getCartById(id);
    return cart;
  }

  async addCart(userId) {
    const newCart = {
      user: userId,
      products: [],
    };
    const createdCart = await this.cartDAO.addCart(newCart);
    return createdCart;
  }

  async addProductToCart(cartId, productId, quantity) {
    const updatedCart = await this.cartDAO.addProductToCart(
      cartId,
      productId,
      quantity
    );
    return updatedCart;
  }

  async deleteProductFromCart(cartId, productId) {
    const updatedCart = await this.cartDAO.deleteProductFromCart(
      cartId,
      productId
    );
    return updatedCart;
  }

  async updateCart(cartId, updates) {
    const updatedCart = await this.cartDAO.updateCart(cartId, updates);
    return updatedCart;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const updatedCart = await this.cartDAO.updateProductQuantity(
      cartId,
      productId,
      quantity
    );
    return updatedCart;
  }

  async deleteAllProductsFromCart(cartId) {
    const updatedCart = await this.cartDAO.deleteAllProductsFromCart(cartId);
    return updatedCart;
  }
}

export default CartService;
