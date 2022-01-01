import { generateAccessToken, generateRefreshToken } from "../authentication/accessToken.js";
import UserLoginModel from "../models/userLoginModel.js";

export const UserCredentials = async (req, res, next) => {
    try {
        const data = await new UserLoginModel(req.body.email, req.body.password).findOne();
        if (data == undefined) {
            res.sendStatus(406);
        }
        else {
            const accessToken = generateAccessToken({ ...data, headers: req.headers });
            const refreshToken = generateRefreshToken({ ...data, headers: req.headers });
            res.send({ ...data, accessToken: accessToken, refreshToken: refreshToken });
        }
    }
    catch (err) {
        console.log(err)
        res.send(err);
    }
}