import dbConnection from "../dbConn/dbConn.js";

export default class ExportsModel {
    constructor(data) {
        this.data = data;
        this.data.details = JSON.stringify(this.data.details);
        this.data.entry_by = 1;
        this.data.is_billed = false;

    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO exports (shipper,shipment_type,customs_PPN,transaction_type,agent_authorization,details,entry_by,is_billed)
             VALUES (?)`;
            const values = [[this.data.shipper, this.data.shipment_type, this.data.customs_PPN, this.data.transaction_type, this.data.agent_authorization, this.data.details, this.data.entry_by, this.data.is_billed]];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result[0]);
            });
        });

        return saveData;

    }
    static findAll() {
        const getAllData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM exports`;
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
            const query = `SELECT * FROM exports WHERE customs_PPN = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
            });
        });
        return getData;
    }

    static modifyExport(data) {
        data.details = JSON.stringify(data.details);

        const getData = new Promise((resolve, reject) => {
            const query = `UPDATE exports SET shipper = ?,shipment_type = ?,customs_PPN = ?,transaction_type = ?,agent_authorization = ?,details = ?,is_billed = ? WHERE exports_id = ?`;
            const values = [data.shipper, data.shipment_type, data.customs_PPN, data.transaction_type, data.agent_authorization, data.details, data.is_billed, data.exports_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result[0]);
            });
        });
        return getData;
    }
}