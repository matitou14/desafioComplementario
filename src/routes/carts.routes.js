import { Router } from "express";
import cartModel from "../dao/models/carts.models.js";
import productModel from "../dao/models/products.models.js";


const cartRouter = Router();


// GET /api/carts/:cid
cartRouter.get("/cart/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartModel.findById(cid).populate('products.product').exec();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.render('cart', { cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const product = await productModel.findById(pid);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingProductIndex = cart.products.findIndex(
      (p) => String(p.product) === pid
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity || 1;
    } else {
      cart.products.push({ product: pid, quantity: quantity || 1 });
    }

    await cart.save();

    return res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/carts/:cid/products/:pid

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingProductIndex = cart.products.findIndex(
      (p) => String(p.product) === pid
    );

    if (existingProductIndex !== -1) {
      cart.products.splice(existingProductIndex, 1);
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await cart.save();

    return res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
// PUT /api/carts/:cid

cartRouter.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = products;
    await cart.save();
    return res.status(200).json({ message: 'Cart updated successfully', cart });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/carts/:cid/products/:pid
cartRouter.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const product = cart.products.find(p => p.product.toString() === pid);
    if (!product) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    product.quantity = quantity;

    await cart.save();
    return res.status(200).json({ message: 'Product quantity updated successfully', cart });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/carts/:cid
cartRouter.delete('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = [];

    await cart.save();
    return res.status(200).json({ message: 'All products deleted successfully from cart', cart });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

});

// PUT /api/carts/:cid/products/:pid


cartRouter.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(product => product._id == pid);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.products[productIndex].quantity = quantity;

    await cart.save();

    res.status(200).json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/carts/:cid
cartRouter.delete('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartModel.findById(cid);


    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = [];

    await cart.save();

    res.status(200).json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/carts/:cid
cartRouter.get('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await Cart.findById(cid).populate('products');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});





export default cartRouter;