import express from "express";
import { login, logout, register, resetPassword, sendResetPassword, sendVerificationEmail, verifyEmail } from "../Controller/AuthController.js";
import protectRoute from "../Middleware/protectRoute.js";

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.post('/send-verify', protectRoute, sendVerificationEmail);
authRoutes.post('/verify', protectRoute, verifyEmail);
authRoutes.post('/send-reset-password', protectRoute, sendResetPassword);
authRoutes.post('/reset-password', protectRoute, resetPassword);

export default authRoutes;