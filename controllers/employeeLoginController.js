import Employees from "../models/employeeModels.js";
import { generateAccessToken, generateRefreshToken } from "../authentication/accessToken.js";

export const EmployeeCredentials = async (req, res, next) => {
    try {
        const data = await Employees.findOne(req.body.email, req.body.password);
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
        res.send(err);
    }
}