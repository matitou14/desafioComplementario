import { Router } from "express";
import path from 'path';
<<<<<<< HEAD
import { isUser} from "../utils.js";
=======
import __dirname  from "../utils.js";
>>>>>>> master
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

<<<<<<< HEAD
=======
const prodfile = path.join(__dirname, 'data', 'products.json');
>>>>>>> master

router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);
router.get('/pid/:pid', getProductByPidController);
router.post('/', isAdmin, createProductController);
router.put('/:pid', isAdmin, updateProductController);
router.delete('/:pid', isAdmin, deleteProductController);

export default router;
