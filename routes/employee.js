import { addNewEmployeeDetails, getActiveEmployeeDetails, getAllEmployeeDetails, getEmployeeDetails, updateEmployeeDetails } from "../controllers/employeeController.js";
import { Router } from "express";

const employeeRoute = Router();

employeeRoute.route('/')
    .get(getAllEmployeeDetails)
    .post(addNewEmployeeDetails)
    .put(updateEmployeeDetails)

employeeRoute.get('/emailid=:employee_id', getEmployeeDetails);
employeeRoute.get('/active_employees', getActiveEmployeeDetails)

export default employeeRoute;