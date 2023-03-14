import { Router } from "express";
import messagesModel from "../dao/models/messages.model.js";

const router = Router();

router.get('/', async (req, res) => {
    const messages = await messagesModel.find().lean().exec();
    res.render('chat',{messages});
});

export default router;