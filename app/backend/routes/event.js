import Event from "../models/Event.js"
import express from "express"
import { isUserAuthenticaded } from "../config/firebase/authentication.js"
import User from "../models/User.js"

const makeEventRouter = (database) => {
    const eventRouter = express.Router()

    // CREACIÓN
    //eventRouter.post("/create", isUserAuthenticaded,async (req, res) => {
    eventRouter.post("/create", isUserAuthenticaded, async (req, res) => {
        const newEvent = new Event({
            name: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            hour: req.body.hour,
            image: req.body.image,
            place: req.body.place,
            userId: req.userId
        })

        const response = await database.saveEvent(newEvent);
        // Evento sastifactoriamente almacenado en la BD
        if (response) {
            res.status(201).json('Evento almacenado en la BD satisfactoriamente.');
        }

    })

    // Agregar comentario
    eventRouter.put("/comment", isUserAuthenticaded, async (req, res) => {
        try {
            const eventSaved = await Event.findOne({ _id: req.body.eventId })
            const user = await User.findOne({_id: req.userId})
            const name = user.name
            console.log(name);
            eventSaved.comments.push({comment: req.body.comment, nameUser: name})
            await eventSaved.save();
        } catch (err) {
            res.status(500).json(err)
        }
    })

    //PAGINACIÓN
    eventRouter.get('/view/all', async (req, res) => {
        try {
            const events = await Event.find();
            res.status(200).json(events)
            console.log(events);
        } catch (err) {
            res.status(500).json(err)
        }
    })

    //VISUALIZACIÓN UN EVENTO
    eventRouter.get('/view/:id', async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);
            res.status(200).json(event)
            console.log(event);
        } catch (err) {
            res.status(500).json(err)
        }
    })

    //BÚSQUEDA
    eventRouter.get('/search/:filter', async (req, res) => {
        try {
            const event = await Event.find({ $text: { $search: req.params.filter }, $language: "none" });
            res.status(200).json(event)
        } catch (err) {
            res.status(500).json(err)
        }
    })

    return eventRouter
}

export default makeEventRouter