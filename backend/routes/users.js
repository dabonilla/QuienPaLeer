import express from "express";
const usersRouter = express.Router();
import User from '../models/User.js';

// Obtener info de un usuario con el id 
usersRouter.get("/", async (req, res) => {
    const userId = req.query.userId;
    try {
      const user = await User.findById(userId)
      const { _id , ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default usersRouter;