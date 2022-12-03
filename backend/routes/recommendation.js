import Recommendation from "../models/Recommendation.js";
import express from "express"
import { isUserAuthenticaded } from "../config/firebase/authentication.js"
import User from "../models/User.js";

const router = express.Router()
router.post("/create", isUserAuthenticaded, async (req, res) => {
    const newRecommendation = new Recommendation({
        title: req.body.title,
        name: req.body.name,
        author: req.body.author,
        summary: req.body.summary,
        recommendation: req.body.recommendation,
        userId: req.userId,
        image: req.body.image,
    });
    try {
        const recommendationSaved = await newRecommendation.save()
        res.status(201).json(recommendationSaved)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/comment", isUserAuthenticaded, async (req, res) => {
    try {
        const recommendationSaved = await Recommendation.findOne({ _id: req.body.recommendationId })
        const user = await User.findOne({ _id: req.userId })
        const name = user.name
        console.log(name);
        recommendationSaved.comments.push({ comment: req.body.comment, nameUser: name })
        await recommendationSaved.save();
    } catch (err) {
        res.status(500).json(err)
    }
})

//Lectura
router.get("/view/all", async (req, res) => {
    const recommendation = await Recommendation.find();
    res.json(recommendation)
})

router.get('/search/:filter', async (req, res) => {
    try {
        const recommendation = await Recommendation.find({ $text: { $search: req.params.filter }, $language: "none" });
        res.status(200).json(recommendation)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router