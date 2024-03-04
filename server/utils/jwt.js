import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const secretKey = process.env.JWT_SECRET;

// Function to generate JWT token
export function generateToken(payload) {
    try {
        return jwt.sign(payload, secretKey, { expiresIn: '1d' }); 
    } catch (error) {
        throw new Error(error)
    }
}

// Function to verify JWT token
export function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid token');
    }
}