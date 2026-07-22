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
    return password.length > 5 && typeof password === 'string';
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
} 

export const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
}

export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
}