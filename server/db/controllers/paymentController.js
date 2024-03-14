import Payment from '../models/payment.js'
import User from '../models/userModel.js'

export async function recordPayment(req, res){
    const {amount, paidFor} = req.body

    if(amount && paidFor){
        await Payment.create({
            user: req.user._id,
            amount, 
            paidFor
        }).then((data)=>{
            res.status(201).json({
                message: "Payment Recored",
                data: data
            }).catch((error) => {
                res.status(500).json({
                    error: "Error recording payment",
                    message: error
                })
            })
        })
    }else{
        res.status(500).json({
            message: "Some fidels are missing"
        })
    }
}


export async function updateUserPayed(req, res){
    const {paidFor} = req.body
    const {_id} = req.user

    if (paidFor) {
        await User.findByIdAndUpdate(
            _id,
            {trial: false},
        ).then((data) => {
            res.status(200).json({
                message: "Account removed from trial",
                data: data 
            })
        }).catch((error) => {
            res.status(400).json({
                message: "Error removing trial",
                error: error
            })
        })

    } else {
        res.status(500).json({
            message: "No input in paidFor"
        })
    }
}