import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
    name: { type: String, index: 'text', required: true, trim: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    editorial: { type: String, required: true },
    userId: { type: String, required: true },
    image: { type: String, require: true },
    comments: [{ _id: false, comment: String, nameUser: String }]
}, {
    timestamps: true
});
const Donation = mongoose.model("Donation", DonationSchema)

export default Donation;