import { Router } from "express";
import { register } from "../Controller/AuthController.js";

const authRoute = Router();

authRoute.post('/register', register);


export default authRoute;