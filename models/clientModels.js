import dbConnection from "../dbConn/dbConn.js";


class Client {
    constructor(data) {

        this.data = data;
        this.data.client_info = JSON.stringify(this.data.client_info);
        this.data.registered_by = "manager";

    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO clients (account_type,name,primary_email,primary_contact,govId,address,password,registered_by,client_info)
             VALUES (?)`;
            const values = [[this.data.account_type, this.data.name, this.data.primary_email, this.data.primary_contact, this.data.govId, this.data.address, this.data.password, this.data.registered_by, this.data.client_info]];

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
            const query = `SELECT * FROM clients`;
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
            const query = `SELECT * FROM clients WHERE primary_email = ?`;
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