import express from "express";
import { login, logout, register, resetPassword, sendResetPassword, verifyEmail } from "../Controller/AuthController.js";
import protectRoute from "../Middleware/protectRoute.js";

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.post('/verify', verifyEmail);
authRoutes.post('/send-reset-password', sendResetPassword);
authRoutes.post('/reset-password', resetPassword);

export default authRoutes;