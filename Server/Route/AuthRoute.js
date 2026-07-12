import { Router } from "express";
import { login, logout, register, sendVerifyOtp, verifyOtp } from "../Controller/AuthController.js";
import useAuth from "../Middleware/useAuth.js";

const authRoute = Router();

authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.post('/logout', logout);
authRoute.post('/verify-otp', useAuth, verifyOtp);
authRoute.post('/verify-account', useAuth, sendVerifyOtp);

export default authRoute;