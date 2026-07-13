import { Router } from "express";
import { isAuthenticated, login, logout, register, resetOtp, resetPassword, sendVerifyOtp, verifyOtp } from "../Controller/AuthController.js";
import useAuth from "../Middleware/useAuth.js";

const authRoute = Router();

authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.post('/logout', logout);
authRoute.post('/verify-otp', useAuth, verifyOtp);
authRoute.post('/verify-account', useAuth, sendVerifyOtp);
authRoute.post('/is-auth', useAuth, isAuthenticated);
authRoute.post('/send-reset-otp', resetOtp);
authRoute.post('/reset-password', resetPassword);

export default authRoute;