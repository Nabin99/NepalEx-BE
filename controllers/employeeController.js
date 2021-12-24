import EmployeesModel from "../models/employeeModels.js";


export const getAllEmployeeDetails = async (req, res, next) => {
    try {
        let data = await EmployeesModel.findAll();
        data.employee_info = JSON.parse(data.employee_info);
        res.send(data);

    }
    catch (err) {
        res.send(err);
    }
};

export const getEmployeeDetails = async (req, res, next) => {
    try {
        let data = await EmployeesModel.findOne(req.params.emailId);
        console.log(data);
        data.employee_info = JSON.parse(data.employee_info);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
};

export const addNewEmployeeDetails = async (req, res, next) => {
    const employee = new EmployeesModel(req.body);

    try {
        const data = await employee.save()
        res.send(data);
        console.log(req.body);
        console.log(data);

    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}