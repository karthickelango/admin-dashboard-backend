import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String},
    about:{type: String},
    role: {type: String},
    contact: {type: String}
})

export const User = mongoose.model('userDashboard', userSchema)