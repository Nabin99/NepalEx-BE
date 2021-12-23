import { addNewEmployeeDetails, getAllEmployeeDetails, getEmployeeDetails } from "../controllers/employeeController.js";
import { Router } from "express";

const employeeRoute = Router();

employeeRoute.route('/')
    .get(getAllEmployeeDetails)
    .post(addNewEmployeeDetails);

employeeRoute.get('/:emailId', getEmployeeDetails);

export default employeeRoute;