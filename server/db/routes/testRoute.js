import express from 'express'

import { createTest , deleteTest, getTest} from '../controllers/testController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'
const testRoute = express.Router()

// Admin route
testRoute.post('/ad/createTest', protectAdmin, createTest)
testRoute.delete('/ad/deletTest', protectAdmin, deleteTest);


testRoute.get('/ad/test', getTest)

export default testRoute
