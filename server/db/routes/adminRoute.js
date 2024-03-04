// routes/admin
import express from 'express';
import { authAdmin, getAdmin, handleAdmin } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
const adminRoute = express.Router();


adminRoute.post('/adminAuth', authAdmin);
adminRoute.post('/createAdmin', handleAdmin);


adminRoute.get('/', protectAdmin,getAdmin)

export default adminRoute;