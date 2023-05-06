import CartModel from '../dao/models/carts.models.js' 
import MongoDAO from '../dao/models/DAO/MongoDAO.js'

const mongoDAO = new MongoDAO();

export default class CartService {
  
  async getCartById(cartId) {
    try {
      const cart = await mongoDAO.findById(CartModel, cartId).populate('products.product').exec()
      return cart
    } catch (err) {
      throw new Error(`Error al buscar el carrito con ID ${cartId}: ${err.message}`)
    }
  }

  async addToCart(userId, productId, quantity) {
    try {
      let cart = await mongoDAO.findOne(CartModel, { user: userId })

      if (!cart) {
        cart = new CartModel({ user: userId })
      }

      const productIndex = cart.products.findIndex(item => item.product.toString() === productId)

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity
      } else {
        cart.products.push({ product: productId, quantity })
      }

      await mongoDAO.save(cart)
      return cart
    } catch (err) {
      throw err
    }
  }

  async removeFromCart(userId, productId) {
    try {
      const cart = await mongoDAO.findOne(CartModel, { user: userId })

      if (!cart) {
        throw new Error('Cart not found')
      }

      const productIndex = cart.products.findIndex(item => item.product.toString() === productId)

      if (productIndex === -1) {
        throw new Error('Product not found in cart')
      }

      cart.products.splice(productIndex, 1)

      await mongoDAO.save(cart)
      return cart
    } catch (err) {
      throw err
    }
  }

  async clearCart(userId) {
    try {
      const cart = await mongoDAO.findOne(CartModel, { user: userId })

      if (!cart) {
        throw new Error('Cart not found')
      }

      cart.products = []

      await mongoDAO.save(cart)
      return cart
    } catch (err) {
      throw err
    }
  }
}
