import express from "express"
import { isUserAuthenticaded } from "../config/firebase/authentication.js"
import Donation from '../models/Donation.js';
import User from "../models/User.js";

const router = express.Router()

router.post("/create", isUserAuthenticaded, async (req, res) => {
    const newDonation = new Donation({
        name: req.body.name,
        title: req.body.title,
        author: req.body.author,
        editorial: req.body.editorial,
        year: req.body.year,
        userId: req.userId,
        image: req.body.image
    });
    try {
        const donationSaved = await newDonation.save()
        res.status(201).json(donationSaved)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put("/comment", isUserAuthenticaded, async (req, res) => {
    try {
        const donationSaved = await Donation.findOne({ _id: req.body.donationId })
        const user = await User.findOne({ _id: req.userId })
        const name = user.name
        console.log(name);
        donationSaved.comments.push({ comment: req.body.comment, nameUser: name })
        await donationSaved.save();
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/view/all", async (req, res) => {
    const donations = await Donation.find();
    res.json(donations)
})

router.get('/search/:filter', async (req, res) => {
    try {
        const donation = await Donation.find({ $text: { $search: req.params.filter }, $language: "none" });
        res.status(200).json(donation)
    } catch (err) {
        res.status(500).json(err)
    }
})



export default router
