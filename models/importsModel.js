import dbConnection from "../dbConn/dbConn.js";

export default class ImportsModel {
    constructor(data) {
        this.data = data;
        this.data.details = JSON.stringify(data.details);
        this.data.entry_by = 1;
        this.data.is_billed = false;
        //this.documents = data.documents;
    }
    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO imports (shipper,shipment_type,mawb_no,hawb_no,status,details,entry_by,pp_number,finalized_date,is_billed)
             VALUES (?)`;

            const values = [[this.data.shipper, this.data.shipment_type, this.data.mawb_no, this.data.hawb_no, this.data.status, this.data.details, this.data.entry_by, this.data.pp_number, this.data.finalized_date, this.data.is_billed]];
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
            const query = `SELECT * FROM imports`;
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
            const query = `SELECT * FROM imports WHERE imports_id = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
            });
        });
        return getData;
    }
    static searchImport(key) {
        const getData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM imports WHERE pp_number =?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
            });
        });
        return getData;
    }

    static modifyImport(data) {
        data.details = JSON.stringify(data.details);
        const saveData = new Promise((resolve, reject) => {
            const query = `UPDATE imports SET shipper = ?,shipment_type = ?,mawb_no = ?,hawb_no = ?,status = ?, details = ?,pp_number = ?, finalized_date =? ,is_billed = ? , bill_no = ? WHERE imports_id = ?`;

            const values = [data.shipper, data.shipment_type, data.mawb_no, data.hawb_no, data.status, data.details, data.pp_number, data.finalized_date, data.is_billed, data.bill_no, data.imports_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result[0]);
            });

        });
        return saveData;

    }

    static getShipmentsDate() {
        const Data = new Promise((resolve, reject) => {

            const key = new Date(Date.now() - 2629800000);
            const query = `SELECT entry_date FROM imports WHERE entry_date >= ?`;
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
            const query = `SELECT is_billed,COUNT ( * ) FROM imports WHERE entry_date >= ? OR is_billed = 0 GROUP BY is_billed `;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }


            });

        });

        return Data;
    }

}