import dbConnection from "../dbConn/dbConn.js";


class EmployeeLoginModel {
    constructor(email, password) {

        this.email = email;
        this.password = password;

    }

    findOne() {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT employee_id,name,p_email,p_contact,department,image FROM employee_details WHERE p_email = ? and password = ?`;
            dbConnection.query(query, [this.email, this.password], (err, result) => {
                if (err) reject(err);
                else {

                    resolve(result[0]);
                }


            });

        });

        return Data;
    }

}
export default EmployeeLoginModel;