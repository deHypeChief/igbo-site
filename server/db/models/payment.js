import mongoose from "mongoose";
const Schema = mongoose.Schema;

const paymentSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number
    },
    paidFor: {
        type: String
    }
})


export default mongoose.model('Payment', paymentSchema);
