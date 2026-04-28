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
            return res.json({ success: false, message: "The user already exists" })
        }

        if (!validEmail(email)) {
            return res.json({ success: false, message: "Invalid email" })
        }

        const hashedPass = hashPassword(password);

        await new user({
            username, email, password: hashedPass
        });

        const token = signToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_EV === "development" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({
            success: true,
            message: "user created successfully",
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log("Something went wrong on register", error)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "All fields are required"
        });
    }
    try {

        const user =await user.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid email address"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Unauthorized access"
            })
        }

        const token = signToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_EV === "development" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({
            success: true,
            message: "user login successfully",
        })

    } catch (error) {
        console.error("Something went wrong in login", error)
        return res.status(500).json({
            success:false,
            message: "Internal server error"
        })
    }


}