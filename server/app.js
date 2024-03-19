import express from 'express';
import mongoose from 'mongoose';
import { connectToMongoDB, dbClose } from './db/dbConfig.js';
import adminRoute from './db/routes/adminRoute.js';
import userRoute from './db/routes/userRoute.js';
import lessonRoute from './db/routes/lessonRoute.js';
import testRoute from './db/routes/testRoute.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToMongoDB();

const app = express();
const PORT = process.env.PORT || 3600;

// app.use(cors({
//   origin: process.env.NODE_ENV == "dev" ? 'http://localhost:5173' : 'https://igbo-site.vercel.app/',
// }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// // routes
// app.get('/', (req, res) => {
//   res.send('Server is up and running');
// });
express.static.mime.define({'application/javascript': ['js']});
app.use(express.static(path.join(__dirname, 'dist')));

// main Routes
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);
app.use('/api/lesson', lessonRoute);
app.use('/api/test', testRoute);


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing MongoDB connection...');
  await dbClose();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
