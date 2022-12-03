import express from 'express'
import User from '../models/User.js';
import Event from '../models/Event.js'
import Book from '../models/Book.js'
import Donation from '../models/Donation.js'
import Swap from '../models/Swap.js'
import { isUserAuthenticaded } from '../config/firebase/authentication.js';

const makeProfileRouter = (database) => {
    const profileRouter = express.Router();

    //VISUALIZAR PERFIL DE OTRO USUARIO
    profileRouter.get('/view/:userId', async (req, res) => {
        const user = await User.findById(req.params.userId);
        const events = await Event.find({ userId: req.params.userId });
        const books = await Book.find({ userId: req.params.userId })
        const donations = await Donation.find({ userId: req.params.userId })
        const swaps = await Swap.find({ userId: req.params.userId })
        if (user) {
            res.status(201).json({ user, events, books, donations, swaps });
        } else {
            res.status(500)
        }
    })

    //VISUALIZAR PERFIL DEL USUARIO LOGUEADO
    profileRouter.get('/myInfo', isUserAuthenticaded, async (req, res) => {
        const user = await User.findById(req.userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(500)
        }
    })

    //EDITAR PERFIL
    profileRouter.put('/update', isUserAuthenticaded, async (req, res) => {
        const user = await User.findById(req.userId);
        if (req.body.name) user.name = req.body.name
        if (req.body.lastName) user.lastName = req.body.lastName
        if (req.body.phone) user.phone = req.body.phone
        if (req.body.photo) user.photo = req.body.photo
        const response = await database.saveUser(user);
        if (response) {
            res.status(201).json('Perfil actualizado en la BD satisfactoriamente.');
        } else {
            res.status(500).json('Error al actualizar el perfil')
        }

    })

    return profileRouter
}

export default makeProfileRouter;