import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crawlRouter from './routes/crawl';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/crawl', crawlRouter);

mongoose.connect(process.env.MONGODB_URI || '', {}).then(() => {
  console.log('MongoDB connected');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
