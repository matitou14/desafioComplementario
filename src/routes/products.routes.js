import { Router } from "express";
import path from 'path';
import __dirname from "../utils.js";
import { 
    getAllProductsController,  getProductByIdController, getProductByPidController, 
createProductController,  updateProductController, deleteProductController } from "../controllers/productsControllers.js";




const router = Router();

const products = []

const prodfile = path.join(__dirname, 'data', 'products.json');


router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController,);
router.get('/pid/:pid', getProductByPidController);
router.post('/', createProductController);
router.put('/:pid', updateProductController);
router.delete('/:pid', deleteProductController);


export default router;
