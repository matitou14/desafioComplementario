import { Router } from "express";
import { getAllMessages, addMessageController } from "../controllers/messages.controller.js";
// import { isUser } from "../utils.js";

const router = Router();

router.get('/', getAllMessages);
router.post('/', addMessageController);

export default router;
