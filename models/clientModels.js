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
        this.registeredTime = null;

    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            this.registeredTime = new Date();
            console.log(this.clientInfo)
            const query = `INSERT INTO client_details (account_type,name,p_email,p_contact,govId,address,password,clientInfo,registered_time)
             VALUES (?)`;
            const values = [[this.acType, this.name, this.pEmail, this.pContact, this.govId, this.address, this.password, this.clientInfo, this.registeredTime]];

            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
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
                    resolve(result);
                }
            });
        });

        return allData;
    }
    static findOne(key) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT * FROM client_details WHERE p_email = ?`;
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