import Swap from "../models/Swap.js"
import express from "express"
import { isUserAuthenticaded } from '../config/firebase/authentication.js'
import User from "../models/User.js"

const router = express.Router()

//CREACIÓN
router.post("/create", isUserAuthenticaded, async (req, res) => {
    const newSwap = new Swap({
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        interest: req.body.interest,
        userId: req.userId,
        image: req.body.image,
    });
    try {
        const swapSaved = await newSwap.save()
        res.status(201).json(swapSaved)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/comment", isUserAuthenticaded, async (req, res) => {
    try {
        const swapSaved = await Swap.findOne({ _id: req.body.swapId })
        const user = await User.findOne({ _id: req.userId })
        const name = user.name
        console.log(name);
        swapSaved.comments.push({ comment: req.body.comment, nameUser: name })
        await swapSaved.save();
    } catch (err) {
        res.status(500).json(err)
    }
})

//Lectura
router.get("/view/all", async (req, res) => {
    const swap = await Swap.find();
    res.json(swap)
})

router.get('/search/:filter', async (req, res) => {
    try {
        const swap = await Swap.find({ $text: { $search: req.params.filter }, $language: "none" });
        res.status(200).json(swap)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router