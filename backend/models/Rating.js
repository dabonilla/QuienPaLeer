import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    bookId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number }
});
const Rating = mongoose.model("Rating", RatingSchema)

export default Rating;