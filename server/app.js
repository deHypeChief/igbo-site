import express from 'express';
import mongoose from 'mongoose';
import { connectToMongoDB } from './db/dbConfig.js';
import adminRoute from './db/routes/adminRoute.js';
import userRoute from './db/routes/userRoute.js';
import lessonRoute from './db/routes/lessonRoute.js';
import testRoute from './db/routes/testRoute.js';
import cors from 'cors';

connectToMongoDB();

const app = express();
const PORT = process.env.PORT || 3600;
const isProduction = process.env.NODE_ENV === 'production';

// Conditionally enable CORS based on environment
if (isProduction) {
  // Allow only main domain in production
  app.use(cors({ origin: 'https://igbo-site.vercel.app/' }));
  app.options('*', cors({ origin: 'https://igbo-site.vercel.app/' }));

} else {
  // Allow localhost in development
  app.use(cors({ origin: 'http://localhost:5173' }));
  app.options('*', cors({ origin: 'http://localhost:5173' }));
}

// Handle preflight requests

// Dynamic CORS configuration based on the incoming request
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'https://igbo-site.vercel.app/'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Set Access-Control-Allow-Credentials header
  }
  // Handle other CORS headers and methods as needed
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());




// routes
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// main Routes
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);
app.use('/api/lesson', lessonRoute);
app.use('/api/test', testRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
