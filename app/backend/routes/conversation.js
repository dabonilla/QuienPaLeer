import express from 'express';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js'
import { isUserAuthenticaded } from '../config/firebase/authentication.js';

const makeConversationRouter = (database) => {

    const conversationRouter = express.Router();

    // Create new conversation between two users
     
    conversationRouter.post('', isUserAuthenticaded, async (req, res) => {

        // Si hay una conversación creada previamente notificarlo
        try {
            const conversation = await Conversation.findOne({
              members: { $all: [req.userId, req.body.receiverId] },
            });
            if (conversation) {
                return res.status(200).json({alreadyExists: true})
            }
          } catch (err) {
            return res.status(500).json(err);
          }

        const senderId = req.userId;

        const newConversation = new Conversation({
            members: [senderId, req.body.receiverId]
        })

        try {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        } catch (error) {
            res.status(500).json(error);
        }

    });

    // Get conversations with a userId 

    conversationRouter.get('', isUserAuthenticaded, async(req, res) => {

        try{
            const conversations = await Conversation.find({
                members: { $in: [req.userId] },
            });
            res.status(200).json(conversations);
        }catch(error) {
            res.status(500).json(error);
        }
    });

    // Delete a conversation with its id

    conversationRouter.delete('/:conversationId', isUserAuthenticaded, async(req, res) => {

        try {
            // Comprobar que existe una conversación con el id brindado
            const result = await Conversation.findById(req.params.conversationId);
            if (!result) {
                throw {message:"No existe la conversación a eliminar"}
            }
            // Eliminar las conversación con el id
            await Conversation.deleteOne({_id: req.params.conversationId});
            // Eliminar los mensajes con el id de la conversación a eliminar
            await Message.deleteMany({conversationId: req.params.conversationId});
            res.status(200).json(true);
        } catch (error) {
            res.status(500).json(error);
        }

    });



    return conversationRouter;

}

export default makeConversationRouter;