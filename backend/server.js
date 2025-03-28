import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}).catch(err => console.log(err));
