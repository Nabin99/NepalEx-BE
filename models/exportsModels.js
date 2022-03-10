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
            const query = `UPDATE exports SET shipper = ?,shipment_type = ?,customs_PPN = ?,transaction_type = ?,agent_authorization = ?,details = ? WHERE exports_id = ?`;
            const values = [data.shipper, data.shipment_type, data.customs_PPN, data.transaction_type, data.agent_authorization, data.details, data.exports_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result[0]);
            });
        });
        return getData;
    }

    static getShipmentsDate() {
        const Data = new Promise((resolve, reject) => {

            const key = new Date(Date.now() - 2629800000);
            const query = `SELECT entry_date FROM exports WHERE entry_date >= ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }


            });

        });

        return Data;
    }


    static getBillStatusCount() {
        const Data = new Promise((resolve, reject) => {

            const key = new Date(Date.now() - 2629800000);
            const query = `SELECT is_billed,COUNT ( * ) FROM exports WHERE entry_date >= ? OR is_billed = 0 GROUP BY is_billed `;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }


            });

        });

        return Data;
    }



    static getAllUnBilledShipments() {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT shipper,shipment_type,customs_PPN,transaction_type,agent_authorization,details,entry_date FROM exports WHERE is_billed = 0`
            dbConnection.query(query, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result.map(obj => ({
                        ...obj, details: JSON.parse(obj.details)

                    })));
                }


            });

        });

        return Data;
    }
    static setBilled(data) {
        const Data = new Promise((resolve, reject) => {
            let query = `UPDATE exports SET is_billed= 1, bill_no = ?  WHERE customs_PPN = ? `;
            for (let i = 1; i < data.list.length; i++) {
                query += "OR customs_PPN = ? "
            }

            dbConnection.query(query, [data.bill_no, ...data.list], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }


            });

        });

        return Data;
    }
}