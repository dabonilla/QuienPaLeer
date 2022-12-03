import express from 'express';
import Message from '../models/Message.js';
import { isUserAuthenticaded } from '../config/firebase/authentication.js';

const makeMessageRouter = (database) => {

    const messagesRouter = express.Router();

     
    messagesRouter.post('', isUserAuthenticaded, async (req, res) => {

        const newMessage = new Message({...req.body, sender: req.userId});
         
        try {
            const savedMessage = await newMessage.save();
            res.status(200).json(savedMessage);
        } catch (error) {
            res.status(500).json(error);
        }

    });


    messagesRouter.get('/:conversationId', isUserAuthenticaded, async(req, res) => {

        try {
            const messages = await Message.find({
                conversationId: req.params.conversationId
            });
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json(error);
        }
        
    });


    return messagesRouter;

}

export default makeMessageRouter;