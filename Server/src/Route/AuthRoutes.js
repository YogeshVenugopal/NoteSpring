import express from "express";
import { register } from "../Controller/AuthController.js";

const authRoutes = express.Router();

authRoutes.post('/register', register)

export default authRoutes;