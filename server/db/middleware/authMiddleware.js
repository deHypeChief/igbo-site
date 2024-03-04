import jwt from 'jsonwebtoken'
import Admin from '../models/adminModel.js'
import User from '../models/userModel.js'


export async function protectUser(req, res, next) {
    let token
    if (req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }
            next()
        } catch (error) {
            return (res.status(401).json({
                message: "Not authorized"
            }))
        }
    }
    if (!token) {
        rerutn(res.status(401).json({
            message: "Not authorized T-"
        }))
    }
}


export async function protectAdmin(req, res, next) {
    let token
    if (req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Admin.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'Admin not found' });
            }
            next()
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Not authorized" })
        }
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized T-" })
    }
}