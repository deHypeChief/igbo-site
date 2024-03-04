import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminID: {
        type: String,
        required: true,
        unique: true
    },
    pin: {
        type: String,
        required: true
    }
})


export default mongoose.model('Admin', adminSchema);
