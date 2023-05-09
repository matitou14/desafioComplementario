import CartModel from "../carts.models.js";

class CartDAO {
  async getCartById(id) {
    const cart = await CartModel.findById(id).populate('products.product');
    return cart;
  }

  async addCart(cart) {
    const newCart = new CartModel(cart);
    await newCart.save();
    return newCart;
  }

  async addProductToCart(cartId, product) {
    const cart = await CartModel.findById(cartId);
    const productIndex = cart.products.findIndex(p => p.product.toString() === product.productId);
    if(productIndex !== -1) {
      cart.products[productIndex].quantity += product.quantity;
    } else {
      cart.products.push(product);
    }
    await cart.save();
    return cart;
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();
    return cart;
  }

  async updateCart(cartId, cart) {
    const updatedCart = await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
    return updatedCart;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if(productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
    }
    await cart.save();
    return cart;
  }

  async deleteAllProductsFromCart(cartId) {
    const cart = await CartModel.findById(cartId);
    cart.products = [];
    await cart.save();
    return cart;
  }
}

export default CartDAO;
