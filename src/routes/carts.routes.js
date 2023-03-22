import { Router } from "express";
import cartModel from "../dao/models/carts.models.js";
import productModel from "../dao/models/products.models.js";


const cartRouter = Router();

// Create a new cart
cartRouter.post('/', async (req, res) => {
  const newCart = new cartModel({ products: [] });
  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get all carts with their products
cartRouter.get('/', async (req, res) => {
  try {
    const carts = await cartModel.find().populate('products.id');
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartModel.findById(cartId).populate('products');
    res.render('carts', { cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Add a product to a cart
cartRouter.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      res.status(404).send('Cart not found');
      return;
    }

    const product = await productModel.findById(pid);
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }

    // Check if the product is already in the cart
    const existingProduct = cart.products.find(
      (p) => p.product.toString() === pid
    );
    if (existingProduct) {
      // If the product already exists in the cart, update its quantity
      existingProduct.quantity += parseInt(quantity);
    } else {
      // If the product doesn't exist in the cart, add it with the given quantity
      cart.products.push({ product: pid, quantity: parseInt(quantity) });
    }

    // Save the updated cart to the database
    const savedCart = await cart.save();

    // Return the updated cart
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a cart with an array of products
cartRouter.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      res.status(404).send('Cart not found');
      return;
    }

    // Remove all products from the cart
    cart.products = [];

    // Add the new products to the cart
    for (const product of products) {
      const existingProduct = await productModel.findById(product.product);
      if (!existingProduct) {
        res.status(404).send(`Product with ID ${product.product} not found`);
        return;
      }
      cart.products.push({ product: existingProduct._id, quantity: product.quantity });
    }

    // Save the updated cart to the database
    const savedCart = await cart.save();

    // Return the updated cart
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the quantity of a product in a cart
cartRouter.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      res.status(404).send('Cart not found');
      return;
    }

    const product = cart.products.find(p => p.product.toString() === pid);
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }

    product.quantity = parseInt(quantity);
    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Delete all products from a cart
cartRouter.delete('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const updatedCart = await cartModel.findByIdAndUpdate(
      cid,
      { products: [] },
      { new: true }
    ).populate('products.product');

    if (!updatedCart) {
      res.status(404).send('Cart not found');
      return;
    }

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default cartRouter