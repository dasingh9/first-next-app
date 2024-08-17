import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    emailId: { type: String, trim: true, required: true, unique: true},
    password: { type: String },
    group: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;