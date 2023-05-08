import  CartService  from '../services/cart.service.js';

const cartService = new CartService();

const CartController = {
  getCartById: async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartById(cid);
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el carrito' });
    }
  },
  addCart: async (req, res) => {
    try {
      const { userId } = req.user;
      const cart = await cartService.addCart(userId);
      res.status(201).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar el carrito' });
    }
  },
  addProductToCart: async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.addProductToCart(cid, pid, quantity);
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar el producto al carrito' });
    }
  },
  deleteProductFromCart: async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.deleteProductFromCart(cid, pid);
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
    }
  },
  updateCart: async (req, res) => {
    try {
      const { cid } = req.params;
      const { status } = req.body;
      const cart = await cartService.updateCart(cid, { status });
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el carrito' });
    }
  },
  updateProductQuantity: async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.updateProductQuantity(cid, pid, quantity);
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la cantidad del producto en el carrito' });
    }
  },
  deleteAllProductsFromCart: async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.deleteAllProductsFromCart(cid);
      res.status(200).json(cart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default CartController;