import jwt from 'jsonwebtoken';

const signAccessToken = (user) => {
    return jwt.sign({
        sub: user._id.toString(),
        tokenVersion: user.refreshTokenVersion
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
    });
} 

const signRefreshToken = (user) => {
    return jwt.sign({
        sub: user._id.toString()
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
    });
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

export { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };