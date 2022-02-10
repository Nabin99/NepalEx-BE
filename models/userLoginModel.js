import dbConnection from "../dbConn/dbConn.js";


class UserLoginModel {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    findOne() {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT client_id,account_type,name,primary_email,primary_contact,gov_id,address,client_info FROM clients WHERE primary_email = ? and password = ?`;
            dbConnection.query(query, [this.email, this.password], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }

            });

        });

        return Data;
    }

}
export default UserLoginModel;