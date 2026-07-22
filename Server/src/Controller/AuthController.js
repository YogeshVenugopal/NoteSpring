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

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        console.log("Generated OTP:", otp);

        user.verifyOtp = otp;
        user.verifyOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Email Verification",
            html: sendotp(otp)
        });

        return res.status(201).json({ message: "User registered successfully, Please verify your email" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
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

        if (!user.isVerified) {
            return res.status(401).json({ message: "Please verify your email before logging in" });
        }

        const refreshToken = generateRefreshToken(user._id);
        const accessToken = generateAccessToken(user._id);

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

export const verifyEmail = async (req, res) => {
    const { otp, email } = req.body;
    try {
        const user = await User.findOne({ email }).select('+verifyOtp +verifyOtpExpiresAt');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verifyOtp !== otp) {
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

export const sendResetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User with this email does not exist"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.resetOtp = otp;
        user.resetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
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

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email }).select('+resetOtp +resetOtpExpiresAt');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.resetOtp !== otp || !user.resetOtpExpiresAt) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.resetOtpExpiresAt < new Date()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        const hashedPassword = await hashPassword(newPassword);
        user.refreshToken = "";
        user.password = hashedPassword;
        user.resetOtp = null;
        user.resetOtpExpiresAt = null;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}