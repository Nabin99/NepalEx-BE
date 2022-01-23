import dbConnection from "../dbConn/dbConn.js";

export default class Employees {
    constructor(data) {
        this.name = data.name;
        this.pEmail = data.pEmail;
        this.pContact = data.pContact;
        this.govId = data.govId;
        this.pAddr = data.pAddr;
        this.tAddr = data.tAddr;
        this.depart = data.depart;
        this.password = data.password;
        this.employeeInfo = JSON.stringify(data.employeeInfo);
        /* this.image = data.profileImage;
        this.documents = JSON.stringify(data.documents); */
        this.registeredBy = 'employee';
    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO employee_details (name,primary_email,primary_contact,gov_id,permanent_address,temporary_address,department,password,employee_info,registered_by)
             VALUES (?)`;
            const values = [[this.name, this.pEmail, this.pContact, this.govId, this.pAddr, this.tAddr, this.depart, this.password, this.employeeInfo, this.registeredBy]];

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
            const query = `SELECT * FROM employee_details`;
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
            const query = `SELECT employee_id,name,primary_email,primary_contact,department,image FROM employee_details WHERE primary_email = ? and password = ?`;
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
            const query = `SELECT * FROM employee_details WHERE primary_email = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else {

                    resolve(result[0]);
                }


            });

        });

        return Data;
    }


}