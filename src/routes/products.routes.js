import { Router } from "express";
import path from 'path';
import { isUser} from "../utils.js";
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
const prodfile = path.join(path.resolve(), 'src', 'data', 'products.json');

const products = [];


router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);
router.get('/pid/:pid', getProductByPidController);
router.post('/', isAdmin, createProductController);
router.put('/:pid', isAdmin, updateProductController);
router.delete('/:pid', isAdmin, deleteProductController);

export default router;
