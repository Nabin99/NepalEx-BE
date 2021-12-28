import { Router } from "express";
import { EmployeeCredentials } from "../../controllers/employeeLoginController.js";

const employeeLoginRoute = Router();

employeeLoginRoute.post('/', EmployeeCredentials);

export default employeeLoginRoute;