import dotenv from 'dotenv' 
import mongoose from 'mongoose';
dotenv.config()

const DB_URL = process.env.NODE_ENV === 'production' ? process.env.DB_URL : process.env.DB_LOCAL
export const connectToMongoDB = () => {
    mongoose.connect(DB_URL);

    const db = mongoose.connection;

    db.on('error', (error) => {
        console.error('MongoDB connection error:', error);
        setTimeout(connectToMongoDB, 20000);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB!');
    });
};

export const dbClose = async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
};