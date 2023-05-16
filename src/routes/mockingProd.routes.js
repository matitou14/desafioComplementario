import { Router } from "express";
import { getMockingProducts } from "../controllers/mockingProd.controllers.js";

const router = Router();

router.get('/', getMockingProducts)

export default router;