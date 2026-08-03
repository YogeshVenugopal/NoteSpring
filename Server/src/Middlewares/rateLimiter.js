import { rateLimit } from 'express-rate-limit';

const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === "production" ? 10 : 100,                  // 10 attempts per IP per window
    message: { message: 'Too many login attempts. Try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

export default authRateLimit;