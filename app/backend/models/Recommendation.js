import mongoose from "mongoose";

// TODO
// Agregar el id del usuario
const RecommendationSchema = new mongoose.Schema({
    title: { type: String, required: true, index: 'text', trim: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    recommendation: { type: String, required: true },
    image: { type: String, required: true },
    userId: { type: String, required: true },
    comments: [{ _id: false, comment: String, nameUser: String }]
}, {
    timestamps: true
})

export default mongoose.model("Recommendation", RecommendationSchema)