import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import connectDB from "./Config/db.js";

import errorHandler from "./Utils/errorHandler.js";
import logger from "./Utils/logger.js";

import authRouter from "./Modules/auth/auth.routes.js";
import workspaceRoute from './Modules/workspace/workspace.routes.js';
import cardRouter from './Modules/notes/notes.routes.js';
import todoRouter from './Modules/todos/todo.routes.js';
import projectRouter from './Modules/projects/projects.routes.js'

import requestLogger from "./Middlewares/requestLogger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(requestLogger);
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URI || "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRouter)
app.use('/workspace', workspaceRoute)
app.use('/card', cardRouter)
app.use('/todo',todoRouter)
app.use('/project', projectRouter);
app.use(errorHandler);

app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
});

app.listen(PORT, async () => {
  await connectDB();
  logger.info(`Server is running on port ${PORT}`);
});
