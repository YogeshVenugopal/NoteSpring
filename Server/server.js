import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

connectDB();

app.listen(PORT, () => {
    console.log(`Backend server is running on the ${PORT} port`);
})