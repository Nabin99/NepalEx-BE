import { Router } from "express";
import userLoginRoute from "./login/userLogin.js";
import employeeLoginRoute from "./login/employeeLogin.js";


const loginRoutes = Router();

loginRoutes.use('/user', userLoginRoute);
loginRoutes.use('/employee', employeeLoginRoute);

export default loginRoutes;
