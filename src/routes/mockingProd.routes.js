import { Router } from "express";
import { createProduct } from "../controllers/mockingProd.controllers.js";
import { getMockingProducts } from "../controllers/mockingProd.controllers.js";

const router = Router();

router.get('/', getMockingProducts)
router.post('/', createProduct)

export default router;