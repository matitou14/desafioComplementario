import { Router } from "express";
import { addProductToCart, getCartById, deleteProductFromCart, updateCart, updateProductQuantity, deleteAllProductsFromCart } from '../controllers/cartControllers.js';

const router = Router();

router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', deleteAllProductsFromCart);

export default router;
