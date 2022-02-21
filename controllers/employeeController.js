import EmployeesModel from "../models/employeeModels.js";


export const getAllEmployeeDetails = async (req, res, next) => {
    try {
        let data = await EmployeesModel.findAll();
        res.send(data);

    }
    catch (err) {
        res.send(err);
    }
};

export const getEmployeeDetails = async (req, res, next) => {
    try {
        let data = await EmployeesModel.findOne(req.params.id);
        if (data.length == 0) {
            res.status(404).send({ message: "Employee With Emailid " + req.params.id + " Not Found !!!" })
        }
        else {
            data[0].employee_info = JSON.parse(data[0].employee_info);
            res.send(data[0]);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
};

export const addNewEmployeeDetails = async (req, res, next) => {
    const employee = new EmployeesModel(req.body);

    try {
        await employee.save()
        res.send({ message: "Successfully Added New Employee Details" });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
}

export const getActiveEmployeeDetails = async (req, res, next) => {
    try {
        let data = await EmployeesModel.getActiveEmployeeDetails();
        console.log(data);
        data = data.map((value) => (value.employee_info = JSON.parse(value.employee_info)));
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
};

export const updateEmployeeDetails = async (req, res, next) => {

    try {
        await EmployeesModel.updateEmployeeDetails(req.body);
        res.send({ message: "Successfully Added New Employee Details" });

    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occured!!!", ...err });

    }
};