import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    testType: {
        type: String,
        required: true,
        default: true
    },
    questions:{
        type: String,
        required: true,
    },
    xp: {
        type: Number,
        required: true,
        default: 15
    },
    lesson:{
        type: Number,
        required: true,
    },
    dateCreated: {
        type: Date, 
        default: Date.now
    }
});
export default mongoose.model('Test', testSchema);