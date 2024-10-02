//backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { Authentication } from './routes/authRoutes.js';
import { mailRoutes } from './routes/mailRoutes.js';

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');

const database = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            serverSelectionTimeoutMS: 10000,
        });
        console.log("Database Connected!");
    } catch (error) {
        console.log("Database Connection Error : ",error);
    }
}
database();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));
app.use('/api/auth',Authentication);
app.use('/api/user',Authentication);
app.use('/api/mail',mailRoutes);

app.get("/",(req, res) => {
    res.json({ msg: "Backend Server Connected Successfully!"})
});

app.listen(process.env.PORT, () => {
    console.log(`Backend Server Connected In The Port http://localhost:${process.env.PORT} `);
});