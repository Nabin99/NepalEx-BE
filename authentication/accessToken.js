import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generateAccessToken = (userDetail) => {
    return jwt.sign(userDetail, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}
export const generateRefreshToken = (userDetail) => {
    return jwt.sign(userDetail, process.env.REFRESH_ACCESS_TOKEN_SECRET);
}
