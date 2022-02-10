import Employees from "../models/employeeModels.js";
import { generateAccessToken, generateRefreshToken } from "../authentication/accessToken.js";

export const EmployeeCredentials = async (req, res, next) => {
    try {
        const data = await Employees.searchEmployee(req.body.email, req.body.password);
        if (data.length === 0) {
            res.status(404).send({ message: "User With Given Email And Password Not Found!!!" });
        }
        else {
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