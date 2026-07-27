import asyncHandler from "../Utils/asyncHandler.js";
import { verifyAccessToken } from "../Utils/token.js";

const authMiddleware = asyncHandler(async(req, res, next) => {
    const header = req.headers.authorization;

    if(!header?.startsWith('Bearer ')){
        res.status(401).json({ message: 'Missing or malformed authorization header'});
    }

    try {

        const payload = verifyAccessToken(header.split(' ')[1]);
        req.user = { id: payload.sub };
        next();
        
    } catch (error) {
        return res.status(401).json({message: "Invalid or expired access token"});
    }
})

export const authMiddleware;