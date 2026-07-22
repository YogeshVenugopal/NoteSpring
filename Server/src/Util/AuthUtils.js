import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const ValidUsername = (username) => {
    if(!username || typeof username !== 'string') {
        return false;
    }
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    return usernameRegex.test(username);
}

export const validEmail = (email) => {
    if(!email || typeof email !== 'string'){
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const validPassword = (password) => {
    return (
        typeof password === "string" &&
        password.length >= 6
    );
};
export const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
} 

export const generateAccessToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
        }
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
        }
    );
};
export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}