import express from 'express'
import { createLesson, deletLesson,  getLessonByLevel,  getLessons, updateLesson } from '../controllers/lessonController.js'
import { protectAdmin, protectUser } from '../middleware/authMiddleware.js'
const lessonRoute = express.Router()


// admin Only
lessonRoute.post('/ad/createLesson', protectAdmin, createLesson)
lessonRoute.delete('/ad/delLesson', protectAdmin, deletLesson)

lessonRoute.get('/ad/lessons',protectAdmin, getLessons)
lessonRoute.post('/ad/updatelesson', protectAdmin, updateLesson)
// users
lessonRoute.get('/', getLessons)
lessonRoute.post('/oneLesson', getLessonByLevel)

export default lessonRoute