import CartModel from "../dao/models/carts.models.js";
import ProductModel from "../dao/models/products.models.js";

// GET /api/carts/:cartId

export const getCartById = async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cartId).populate("products.product");
    res.status(200).json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// POST /api/carts/:cartId/products/:productId

export const addProductToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.body;
    const cart = await CartModel.findById(cartId);
    const product = await ProductModel.findById(productId);

    if (!cart || !product) {
      return res.status(404).json({ message: "Cart or product not found" });
    }

    cart.products.push({ product: product._id, quantity: 1 });
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// DELETE /api/carts/:cartId/products/:productId

export const deleteProductFromCart = async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cartId);
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === req.params.productId
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

// PUT /api/carts/:cartId

export const updateCart = async (req, res) => {
  try {
    const cart = await CartModel.findByIdAndUpdate(
      req.params.cartId,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// PUT /api/carts/:cartId/products/:productId

export const updateProductQuantity = async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cartId);

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === req.params.productId
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
// DELETE /api/carts/:cartId

export const deleteAllProductsFromCart = async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cartId);

    if (cart) {
      cart.products = [];
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
