import { Router } from "express";
import cartModel from "../dao/models/carts.models.js";
import productModel from "../dao/models/products.models.js";

const router = Router();


// GET /api/carts/:cid

export const getCartById = async (req, res) => {
    try {
      const cart = await cartModel.findById(req.params.cid).populate("products.product");
      res.status(200).json(cart);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

    
// POST /api/carts/:cid/products/:pid

export const addProductToCart = async (req, res) => {
    try {
      const cart = await cartModel.findById(req.params.cid);
      const product = await productModel.findById(req.params.pid);
  
      cart.products.push({ product: product._id, quantity: 1 });
  
      await cart.save();
  
      res.status(200).json(cart);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };


// DELETE /api/carts/:cid/products/:pid

export const deleteProductFromCart = async (req, res) => {
    try {
      const cart = await cartModel.findById(req.params.cid);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === req.params.pid
      );
  
      if (productIndex >= 0) {
        cart.products.splice(productIndex, 1);
        await cart.save();
      }
  
      res.status(200).json(cart);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  // PUT /api/carts/:cid

  export const updateCart = async (req, res) => {
    try {
      const cart = await cartModel.findByIdAndUpdate(
        req.params.cid,
        { ...req.body },
        { new: true }
      );
  
      res.status(200).json(cart);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
  
    // PUT /api/carts/:cid/products/:pid

    export const updateProductQuantity = async (req, res) => {
        try {
          const cart = await cartModel.findById(req.params.cid);
      
          const productIndex = cart.products.findIndex(
            (p) => p.product.toString() === req.params.pid
          );
      
          if (productIndex >= 0) {
            cart.products[productIndex].quantity = req.body.quantity;
            await cart.save();
          }
      
          res.status(200).json(cart);
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      };
      
        // DELETE /api/carts/:cid
    
        export const deleteAllProductsFromCart = async (req, res) => {
            try {
              const cart = await cartModel.findByIdAndUpdate(
                req.params.cid,
                { $set: { products: [] } },
                { new: true }
              );
          
              res.status(200).json(cart);
            } catch (err) {
              console.error(err.message);
              res.status(500).send("Server Error");
            }
          };

export default router;



