import mongoose from "mongoose";

const SwapSchema = new mongoose.Schema({
    name: { type: String, index: 'text', required: true, trim: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    interest: { type: String, required: true },
    userId: { type: String , required: true},
    image: { type: String, required: true }
}, {
    timestamps: true
});
const Swap = mongoose.model("Swap", SwapSchema)

export default Swap;