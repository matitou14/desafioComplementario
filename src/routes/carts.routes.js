import express from 'express';
import CartController from '../controllers/cartControllers.js';
<<<<<<< HEAD
import { isUser }from '../utils.js';

=======
// import { isUser } from '../utils.js';
>>>>>>> master

const router = express.Router();
const cartController = new CartController();

router.get('/:cid', cartController.getCartById);
<<<<<<< HEAD
router.post('/', isUser, cartController.addCart);
=======
router.post('/', cartController.addCart);
>>>>>>> master
router.post('/:cid/product/:pid', cartController.addProductToCart);
router.delete('/:cid/products/:pid', cartController.deleteProductFromCart);
router.put('/:cid',cartController.updateCart);
router.put('/:cid/products/:pid',cartController.updateProductQuantity);
router.delete('/:cid', cartController.deleteAllProductsFromCart);

export default router;
