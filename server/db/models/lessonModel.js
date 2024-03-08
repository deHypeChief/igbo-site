import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    level: {
        type: Number,
        unique: true,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    quiz: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model('Lesson', lessonSchema);