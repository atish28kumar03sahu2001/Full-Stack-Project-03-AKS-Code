//backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req, res) => {
    res.json({ msg: "Backend Server Connected Successfully!"})
});

app.listen(process.env.PORT, () => {
    console.log(`Backend Server Connected In The Port http://localhost:${process.env.PORT} `);
});