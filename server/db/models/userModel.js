import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: Number,
    },
    exp: {
        type: Number,
    },
    userPayment:{
        type: String
    }
})


export default mongoose.model('User', userSchema);
