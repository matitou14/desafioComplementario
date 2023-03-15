import { Router } from "express";
import cartModel from "../dao/models/carts.models.js";
import productModel from "../dao/models/products.models.js";


const cartRouter = Router();

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

cartRouter.get('/', async (req, res) => {
  try {
    const carts = await cartModel.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const newProd = new productModel({
    name: 'product',
    quantity: 3,
  });
  
  newProd.save()
    .then(savedProduct => {
      console.log('Product saved:', savedProduct);
    })
    .catch(err => {
      console.error(err);
    });

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

export default cartRouter;
