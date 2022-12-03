import Book from "../models/Book.js"
import express from "express"
import { isUserAuthenticaded } from '../config/firebase/authentication.js'
import User from "../models/User.js"

const router = express.Router()


router.post("/create", isUserAuthenticaded, async (req, res) => {
    const newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        title: req.body.title,
        editorial: req.body.editorial,
        year: req.body.year,
        price: req.body.price,
        image: req.body.image,
        userId: req.userId
    });
    try {
        const bookSaved = await newBook.save()
        res.status(201).json(bookSaved)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/edit',isUserAuthenticaded, async (req, res) => {
    try{
        const id=req.body._id
        const bookSaved=await Book.findByIdAndUpdate(id,req.body)
        if(bookSaved){
            res.status(200).json('Libro editado')
        }else{
            res.status(500).json('Libro no encontrado')
        }
        
        
    }catch(err){
        res.status(500).json(err)
    }
})
router.put("/comment", isUserAuthenticaded, async (req, res) => {
    try {
        const bookSaved = await Book.findOne({ _id: req.body.bookId })
        const user = await User.findOne({_id: req.userId})
        const name = user.name
        console.log(name);
        bookSaved.comments.push({comment: req.body.comment, nameUser: name})
        await bookSaved.save();
    } catch (err) {
        res.status(500).json(err)
    }
})


router.put("/val", isUserAuthenticaded, async (req, res) => {
    let update = {
        $push: {
            ratings: {
                rating: req.body.ratings.rating,
                userId: req.userId
            }
        },
    }
    try {
        const bookSaved = await Book.findOne({ _id: req.body._id })

        let userRating
        bookSaved.ratings.forEach(e => {
            if (e.userId == req.userId) {
                userRating = e
            }
        })

        if (userRating) {

            res.json(200,bookSaved)
        } else {
            const ratingSaved = await Book.findOneAndUpdate({
                _id: req.body._id
            }, update, { returnNewDocument: true });

            const bookUpdated = await Book.findOne({ _id: req.body._id })

            const ratingReturn = {
                ...bookUpdated._doc,
                totalRatings: null,
                ratingsAveraged: null,
                ratingUser: null
            }
            let sum = 0
            bookUpdated.ratings.forEach(f => {
                sum += f.rating
                if (f.userId = req.userId) {
                    ratingReturn.ratingUser = f.rating
                }
            })

            ratingReturn.totalRatings = bookUpdated.ratings.length;
            ratingReturn.ratingsAveraged = sum / bookUpdated.ratings.length || 0

            res.status(201).json(ratingReturn)
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/view/all",isUserAuthenticaded, async (req, res) => {
    const books = await Book.find();
    const newBooks = []
    books.forEach(e => {
        const newBook = {
            _id: e._id,
            name: e.name,
            title: e.title,
            author: e.author,
            editorial: e.editorial,
            year: e.year,
            price: e.price,
            image: e.image,
            userId: e.userId,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
            comments: e.comments
        }
        let sum = 0
        e.ratings.forEach(f => {
            sum += f.rating
            if (f.userId == req.userId) {
                newBook.ratingUser = f.rating
            }
        })
        newBook.totalRatings = e.ratings.length
        let n = sum / e.ratings.length || 0;
        const num1 = n.toFixed(1);
        newBook.ratings = num1
        if(req.userId==e.userId){
            newBook.actualUserId=e.userId
        }
        newBooks.push(newBook)
    })
    res.json(newBooks)
})


router.get("/getWithUsers", async (req, res) => {
    const books = await Book.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userPublic"
            }
        },
        {
            $unwind: "$userPublic"
        }
    ])
    res.json(books);
})

router.get('/search/:filter', async (req, res) => {
    try {
        const book = await Book.find({ $text: { $search: req.params.filter }, $language: "none" });
        res.status(200).json(book)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router