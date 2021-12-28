import EmployeeLoginModel from "../models/employeeLoginModels.js";
import { generateAccessToken, generateRefreshToken } from "../authentication/accessToken.js";

export const EmployeeCredentials = async (req, res, next) => {
    try {
        const data = await new EmployeeLoginModel(req.body.email, req.body.password).findOne();
        if (data == undefined) {
            res.sendStatus(406);
        }
        else {
            const accessToken = generateAccessToken({ ...data });
            const refreshToken = generateRefreshToken({ ...data });
            res.send({ ...data, accessToken: accessToken, refreshToken: refreshToken });
        }

    }
    catch (err) {
        res.send(err);
    }
}