import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import authRoute from './Route/AuthRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/auth', authRoute);

connectDB();

app.listen(PORT, () => {
    console.log(`Backend server is running on the ${PORT} port`);
})