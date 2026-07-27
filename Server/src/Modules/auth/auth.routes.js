import express from 'express';
import * as authController from './auth.controller.js'
import validate from '../../Middlewares/validate.js';
import { loginSchema, registerSchema } from './auth.validation.js';
import authRateLimit from '../../Middlewares/rateLimiter.js';
import { authMiddleware } from '../../Middlewares/authMiddleware.js';


const authRouter = express.Router();

authRouter.post('/register', validate(registerSchema), authController.register);
authRouter.post('/login', authRateLimit, validate(loginSchema), authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authMiddleware, authController.logout);

export default authRouter;