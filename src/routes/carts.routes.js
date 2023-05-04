import { Router } from "express";
import { addCart, addProductToCart, getCartById, deleteProductFromCart, updateCart, updateProductQuantity, deleteAllProductsFromCart } from '../controllers/cartControllers.js';
import { isUser } from '../utils.js';

const router = Router();

router.get('/:cid', getCartById);
router.post('/', addCart); // Aplicando el middleware isUser
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', deleteAllProductsFromCart);

export default router;