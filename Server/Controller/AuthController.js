import user from "../Model/Usermodel.js";
import { validEmail } from "../Util/checkValidEmail.js";
import hashPassword from "../Util/hashPassword.js";
import { signToken } from "../Util/signToken.js";

export const register = async(req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.json({ success: false, message: "Missing Details" })
    }
    try {
        
        const existingEmail = await user.findOne({email});
        if(existingEmail){
            return res.json({ success: false, message: "The user already exists" })
        }

        if(!validEmail(email)){
            return res.json({ success: false, message: "Invalid email"})
        }

        const hashedPass = hashPassword(password);
        
        await new user({
            username, email, password: hashedPass
        });

        const token = signToken(user._id);

        res.cookie('token', token,{
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
        console.log("Something went wrong on register",error)
    }
}