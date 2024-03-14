import express from 'express'
import { authUser, createUser, getMe, getUsers, updateExp } from '../controllers/userController.js'
import { protectAdmin, protectUser } from '../middleware/authMiddleware.js'
import { recordPayment } from '../controllers/paymentController.js'
const userRoute = express.Router()

userRoute.post('/authUser', authUser)
userRoute.post('/createUser', createUser)


// paymentRoute
userRoute.post('/recPayment', protectUser, recordPayment)

// Admin auth route
userRoute.get('/ad/users',protectAdmin, getUsers)

userRoute.post('/exp', protectUser, updateExp)
userRoute.get('/me',protectUser, getMe)

export default userRoute