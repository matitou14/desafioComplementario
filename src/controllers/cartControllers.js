import CartDAO from "../dao/models/DAO/CartDao.js";
import ProductDAO from "../dao/models/DAO/ProductsDao.js";

class CartController {
  constructor() {
    this.cartDAO = new CartDAO();
    this.productDAO = new ProductDAO();
    this.getCartById = this.getCartById.bind(this);
    this.addCart = this.addCart.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.deleteProductFromCart = this.deleteProductFromCart.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.updateProductQuantity = this.updateProductQuantity.bind(this);
    this.deleteAllProductsFromCart = this.deleteAllProductsFromCart.bind(this);
  }

  async getCartById(req, res) {
    const { cid } = req.params;
    const cart = await this.cartDAO.getCartById(cid);
    res.status(200).json(cart);
  }

  async addCart(req, res) {
    const userId = req.user.id; // asumiendo que el middleware isUser se encargó de verificar y obtener el id del usuario
    const newCart = await this.cartDAO.addCart(userId);
    res.status(201).json(newCart);
  }

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const product = await this.productDAO.getProductById(pid);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedCart = await this.cartDAO.addProductToCart(cid, product, quantity);
    res.status(200).json(updatedCart);
  }

  async deleteProductFromCart(req, res) {
    const { cid, pid } = req.params;
    const updatedCart = await this.cartDAO.deleteProductFromCart(cid, pid);
    res.status(200).json(updatedCart);
  }

  async updateCart(req, res) {
    const { cid } = req.params;
    const { products } = req.body;
    const updatedCart = await this.cartDAO.updateCart(cid, products);
    res.status(200).json(updatedCart);
  }

  async updateProductQuantity(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await this.cartDAO.updateProductQuantity(cid, pid, quantity);
    res.status(200).json(updatedCart);
  }

  async deleteAllProductsFromCart(req, res) {
    const { cid } = req.params;
    const updatedCart = await this.cartDAO.deleteAllProductsFromCart(cid);
    res.status(200).json(updatedCart);
  }
}

export default CartController;
