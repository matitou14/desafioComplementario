import messagesModel from "../dao/models/messages.model.js";

export const getAllMessages = async (req, res) => {
    const messages = await messagesModel.find().lean().exec();
    res.render('chat',{messages})
    }

    export const addMessageController = async (req, res) => {
        const { author, text } = req.body;
        const message = new messagesModel({ author, text });
        await message.save();
        res.redirect('/chat');
      };
