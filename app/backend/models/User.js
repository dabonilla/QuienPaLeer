import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    photo: { type: String }
});

const User = mongoose.model("User", UserSchema);

export default User;