import User from "../../Models/User.js";
import ApiError from "../../Utils/ApiError.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../Utils/token.js"

const issueToken = (user) => {
    return {
        user,
        accessToken: signAccessToken(user),
        refreshToken: signRefreshToken(user)
    }
};

export const register = async({ name, email, password }) => {
    const existing = await User.findOne({ email });
    if(existing) throw new ApiError(409, 'User already exists');

    const user = await User.create({
        name, email, password
    });

    return issueToken(user);
}

export const login = async({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');
    const valid = user && (await user.comparePassword(password));

    if(!valid) throw new ApiError(401, 'Invalid email or password');

    return issueToken(user);
}

export const refresh = async(refreshToken) => {
    let payload;
    try {
        payload = verifyRefreshToken(refreshToken);
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(payload.sub);
    if(!user || user.refreshTokenVersion !== payload.tokenVersion){
        throw new ApiError(401, "Refresh token has been revoked");
    }

    return issueToken(user);
}

export const logout = async(userId) => {
    await User.findByIdAndUpdate(userId, {$inc: {refreshTokenVersion: 1}});
}