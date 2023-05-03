import messagesModel from "../dao/models/messages.model.js";

export const addMessage = async (messageData) => {
    try {
      const message = new messagesModel(messageData);
      await message.save();
      return message;
    } catch (error) {
      throw new Error('Error al agregar mensaje');
    }
  };