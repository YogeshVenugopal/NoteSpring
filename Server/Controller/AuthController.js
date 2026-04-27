import bcrypt from "bcryptjs";
import user from "../Model/Usermodel.js";
import { validEmail } from "../Util/checkValidEmail.js";
import hashPassword from "../Util/hashPassword.js";
import { signToken } from "../Util/signToken.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.json({ success: false, message: "Missing Details" })
    }
    try {

        const existingEmail = await user.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ success: false, message: "The user already exists" })
        }

        if (!validEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" })
        }

        const hashedPass = await hashPassword(password);

        const newUser = await user.create({
            username, 
            email,
            password: hashedPass
        })

        const token = signToken(newUser._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({
            success: true,
            message: "user created successfully",
        })

    } catch (error) {
        console.log("Something went wrong on register", error)
        return res.json({ success: false, message: error })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {
        const isUser = await user.findOne({ email });

        if (!isUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, isUser.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = signToken(isUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
        });
    } catch (error) {
        console.error("Something went wrong in login:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const logout = async(req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.json({
            success: true,
            message: "User logout successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}