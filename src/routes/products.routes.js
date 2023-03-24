import { query, Router } from "express";
import path from 'path';
import __dirname from "../utils.js";
import { getAllProducts, getProductById, getProductByPid, createProduct, updateProduct, deleteProduct } from '../controllers/productsControllers.js'



const router = Router();

const products = []

const prodfile = path.join(__dirname, 'data', 'products.json');


router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/pid/:pid', getProductByPid);
router.post('/', createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);


export default router;