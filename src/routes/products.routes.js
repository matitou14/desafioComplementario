import { Router } from "express";
import path from 'path';
import __dirname  from "../utils.js";
import { 
  getAllProductsController,
  getProductByIdController,
  getProductByPidController, 
  createProductController,
  updateProductController,
  deleteProductController
} from "../controllers/productsControllers.js";
import { isAdmin } from "../utils.js";

const router = Router();

const products = [];

const prodfile = path.join(__dirname, 'data', 'products.json');

router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);
router.get('/pid/:pid', getProductByPidController);
router.post('/', isAdmin, createProductController);
router.put('/:pid', isAdmin, updateProductController);
router.delete('/:pid', isAdmin, deleteProductController);

export default router;
