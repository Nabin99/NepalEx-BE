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
        this.image = data.profileImage;
        this.documents = JSON.stringify(data.documents);
        this.entries = [
            {
                id: 'id',
                action: 'creation',
                date: new Date()
            }
        ]
    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO employee_details (name,p_email,p_contact,govId,p_address,t_address,department,password,image,documents,employee_info,entries)
             VALUES (?)`;
            const values = [[this.name, this.pEmail, this.pContact, this.govId, this.pAddr, this.tAddr, this.depart, this.password, this.image, this.documents, this.employeeInfo, this.entries]];

            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);

                else
                    resolve(result);
            })

        });

        return saveData;

    }

    static findAll() {
        const allData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM employee_details`;
            dbConnection.query(query, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
        });

        return allData;

    }

    static findOne(key) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT * FROM employee_details WHERE p_email = ?`;
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