import dbConnection from "../dbConn/dbConn.js";


class Client {
    constructor(data) {

        this.acType = data.acType;
        this.name = data.name;
        this.pEmail = data.pEmail;
        this.pContact = data.pContact;
        this.govId = data.govId;
        this.address = data.address;
        this.password = data.password;
        this.clientInfo = JSON.stringify(data.clientInfo);
        this.registeredBy = 'manager';

    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO client_details (account_type,name,primary_email,primary_contact,govId,address,password,registered_by,client_info)
             VALUES (?)`;
            const values = [[this.acType, this.name, this.pEmail, this.pContact, this.govId, this.address, this.password, this.registeredBy, this.clientInfo]];

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
            const query = `SELECT * FROM client_details`;
            dbConnection.query(query, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result[0]);
                }
            });
        });

        return allData;
    }
    static findOne(key) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT * FROM client_details WHERE primary_email = ?`;
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
export default Client;