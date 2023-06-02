import express from 'express';
import CartController from '../controllers/cartControllers.js';
import { isUser }from '../utils.js';


const router = express.Router();
const cartController = new CartController();

router.get('/:cid', cartController.getCartById);
router.post('/', isUser, cartController.addCart);
router.post('/:cid/product/:pid', cartController.addProductToCart);
router.delete('/:cid/products/:pid', cartController.deleteProductFromCart);
router.put('/:cid',cartController.updateCart);
router.put('/:cid/products/:pid',cartController.updateProductQuantity);
router.delete('/:cid', cartController.deleteAllProductsFromCart);

export default router;
