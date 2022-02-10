import { generateAccessToken, generateRefreshToken } from "../authentication/accessToken.js";
import UserLoginModel from "../models/userLoginModel.js";

export const UserCredentials = async (req, res, next) => {
    try {
        const data = await new UserLoginModel(req.body.email, req.body.password).findOne();

        if (data.length === 0) {
            res.status(404).send({ message: "User With Given Email And Password Not Found!!!" });
        }
        else {
            data[0].client_info = JSON.parse(data[0].client_info);
            console.log(data[0]);
            const accessToken = generateAccessToken({ ...data[0], headers: req.headers });
            const refreshToken = generateRefreshToken({ ...data[0], headers: req.headers });
            res.send({ ...data[0], accessToken: accessToken, refreshToken: refreshToken });
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
}