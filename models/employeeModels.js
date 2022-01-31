import dbConnection from "../dbConn/dbConn.js";

export default class Employees {
    constructor(data) {
        this.data = data;
        this.data.employee_info = JSON.stringify(this.data.employee_info);
        /* this.image = data.profileImage;
        this.documents = JSON.stringify(data.documents); */
        this.registered_by = 'employee';
    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO employees (name,primary_email,primary_contact,gov_id,permanent_address,temporary_address,department,password,employee_info,registered_by)
             VALUES (?)`;
            const values = [[this.data.name, this.data.primary_email, this.data.primary_contact, this.data.gov_id, this.data.permanent_address, this.data.temporary_address, this.data.department, this.data.password, this.data.employee_info, this.data.registered_by]];

            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);

                else
                    resolve(result[0]);
            });

        });

        return saveData;

    }

    static findAll() {
        const allData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM employees`;
            dbConnection.query(query, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result[0]);

                }
            });
        });

        return allData;

    }
    static searchEmployee(email, password) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT employee_id,name,primary_email,primary_contact,department,image FROM employees WHERE primary_email = ? and password = ?`;
            dbConnection.query(query, [email, password], (err, result) => {
                if (err) reject(err);
                else {

                    resolve(result[0]);
                }


            });

        });

        return Data;
    }

    static findOne(key) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT * FROM employees WHERE primary_email = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else {

                    resolve(result[0]);
                }


            });

        });

        return Data;
    }

    static getActiveEmployeeDetails() {
        const allData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM employees WHERE department!="Manager" AND department!="None"`;
            dbConnection.query(query, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);

                }
            });
        });

        return allData;

    }

    static updateEmployeeDetails(data) {
        data.employee_info = JSON.stringify(data.employee_info);
        const saveData = new Promise((resolve, reject) => {
            const query = `UPDATE employees SET name = ?,primary_email = ?,primary_contact = ?,gov_id = ?,permanent_address = ?,temporary_address = ?,department = ?,password = ?,employee_info = ? WHERE employee_id = ?`;
            const values = [data.name, data.primary_email, data.primary_contact, data.gov_id, data.permanent_address, data.temporary_address, data.department, data.password, data.employee_info, data.employee_id];

            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);

                else
                    resolve(result[0]);
            });

        });

        return saveData;

    }


}