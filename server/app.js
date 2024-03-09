import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { connectToMongoDB } from './db/dbConfig.js';
import adminRoute from './db/routes/adminRoute.js';
import userRoute from './db/routes/userRoute.js';
import lessonRoute from './db/routes/lessonRoute.js';
import testRoute from './db/routes/testRoute.js';
import path from 'path';

connectToMongoDB();

const __filename = fileURLToPath(import.meta.url); // Get the file path using import.meta.url
const __dirname = path.dirname(__filename); // Derive the directory path

const app = express();
const PORT = process.env.PORT || 3600;

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
// Catch all other routes and serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
