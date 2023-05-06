import CartService from '../services/cart.service.js';

const cartService = new CartService();

export default class CartController {
  async addCart(req, res) {
    try {
      const cart = await cartService.createCart(req.body.userId);
      res.status(201).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getCartById(req, res) {
    try {
      const cart = await cartService.getCartById(req.params.cid);
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
      } else {
        res.json(cart);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.addProductToCart(cid, pid, quantity);
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
      } else {
        res.json(cart);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.deleteProductFromCart(cid, pid);
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
      } else {
        res.json(cart);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { userId } = req.body;
      const cart = await cartService.updateCart(cid, userId);
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
      } else {
        res.json(cart);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.updateProductQuantity(cid, pid, quantity);
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
      } else {
        res.json(cart);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteAllProductsFromCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.deleteAllProductsFromCart(cid);
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
      } else {
        res.json(cart);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
