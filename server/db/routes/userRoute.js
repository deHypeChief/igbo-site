import express from 'express'
import { authUser, createUser, getMe, getUsers } from '../controllers/userController.js'
import { protectAdmin, protectUser } from '../middleware/authMiddleware.js'
const userRoute = express.Router()

userRoute.post('/authUser', authUser)
userRoute.post('/createUser', createUser)


// Admin auth route
userRoute.get('/ad/users',protectAdmin, getUsers)
userRoute.get('/me',protectUser, getMe)

export default userRoute