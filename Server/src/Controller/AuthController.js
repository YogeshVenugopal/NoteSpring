import transporter from "../Config/mailer.js";
import { sendotp, sendResetOtp } from "../email/OtpMail.js";
import User from "../Model/userModel.js";
import { generateAccessToken, generateRefreshToken, hashPassword, validEmail, validPassword, ValidUsername, comparePassword } from "../Util/AuthUtils.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        if (!ValidUsername(username)) {
            return res.status(400).json({ message: "Invalid user format" });
        }

        if (!validEmail(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        if (!validPassword(password)) {
            return res.status(400).json({ message: "Invalid Password format" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
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
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to the Note spring application",
            text: `Hi ${username}, welcome to Notespring, your all-in-one application. Optimize your tasks and work efficiently here`
        })

        return res.status(201).json({ message: "User registered successfully", token: accessToken });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(406).json({ message: "All fields are required" });
    }
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const refreshToken = generateRefreshToken(user);
        const accessToken = generateAccessToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: "Login successful", token: accessToken });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token not found" });
    }

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.refreshToken = "";
        await user.save();

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendVerificationEmail = async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email already verified"
            });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000).toString());

        user.verifyOtp = otp;
        user.verifyOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Email Verification",
            html: sendotp(otp)
        });

        return res.status(200).json({ message: "Verification email sent successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const userId = req.user.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verifyOtp !== otp || !user.verifyOtpExpiresAt) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.verifyOtpExpiresAt < new Date()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        user.isVerified = true;
        user.verifyOtp = null;
        user.verifyOtpExpiresAt = null;
        await user.save();

        return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendResetPassword = async(req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "Invalid email address"
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000).toString());

        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Password Reset OTP",
            html: sendResetOtp(otp)
        });

        return res.status(200).json({
            message: "Password reset email sent successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const resetPassword = async(req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.resetPasswordOtp !== otp || !user.resetPasswordOtpExpiresAt) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.resetPasswordOtpExpiresAt < new Date()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        user.resetPasswordOtp = null;
        user.resetPasswordOtpExpiresAt = null;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}