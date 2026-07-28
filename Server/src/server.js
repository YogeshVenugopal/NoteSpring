import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import errorHandler from "./Utils/errorHandler.js";
import cookieParser from 'cookie-parser';
import authRouter from "./Modules/auth/auth.routes.js";
import requestLogger from "./Middlewares/requestLogger.js";
import logger from "./Utils/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(requestLogger);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRouter)
app.use(errorHandler);


app.listen(PORT, async () => {
  await connectDB();
  logger.info(`Server is running on port ${PORT}`);
});
