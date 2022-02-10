import dbConnection from "../dbConn/dbConn.js";

export default class ServiceProviderModel {
    constructor(data) {
        this.name = data.name
        this.entries = {
            id: "id",
            action: "added",
            date: new Date()
        }
    }
    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO service_providers (name,entries)
            VALUES (?)`;
            const values = [[this.name, this.entries]];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
            });
        });
        return saveData;
    }
    static findAll() {
        const getAllData = new Promise((resolve, reject) => {
            const query = `SELECT id,name FROM service_providers`;
            dbConnection.query(query, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
            });
        });
        return getAllData;
    }
    static findOne(key) {
        const getData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM service_providers WHERE name = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
            });
        });
        return getData;
    }
}