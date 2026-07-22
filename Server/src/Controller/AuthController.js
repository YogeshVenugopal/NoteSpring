import User from "../Model/userModel.js";
import { generateAccessToken, generateRefreshToken, hashPassword, validEmail, validPassword, ValidUsername } from "../Util/AuthUtils.js";


export const register = async(req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        if(!ValidUsername(username)){
            return res.status(400).json({message:"Invalid user format"});
        }

        if(!validEmail(email)){
            return res.status(400).json({message:"Invalid email address"});
        }

        if(!validPassword(password)){
            return res.status(400).json({message:"Invalid Password format"});
        }

        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(400).json({message:"Email already exists"});
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name: username,
            email,
            password: hashedPassword
        })

        const refreshToken = generateRefreshToken(user);
        const accessToken = generateAccessToken(user);

        user.refreshToken = refreshToken;
        await user.save();
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(201).json({ message: "User registered successfully", token: accessToken });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}