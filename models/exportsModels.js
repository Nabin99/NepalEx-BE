import dbConnection from "../dbConn/dbConn.js";

export default class ExportsModel {
    constructor(data) {
        this.shipper = data.shipper;
        this.shipmetType = data.shipmentType;
        this.customsPPN = data.customsPPN;
        this.transactionType = data.transactionType;
        this.agentAuth = data.agentAuth;
        // this.documents = data.documents;
        this.details = JSON.stringify(data.details);
        this.entryBy = 'employee';
        this.isBilled = false;

    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO exports (shipper,shipment_type,customs_PPN,transaction_type,agent_authorization,details,entry_by,is_billed)
             VALUES (?)`;
            const values = [[this.shipper, this.shipmetType, this.customsPPN, this.transactionType, this.agentAuth, this.details, this.entryBy, this.isBilled]];
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
            const query = `SELECT * FROM exports WHERE exports_id = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else
                    resolve(result[0]);
            });
        });
        return getData;


    }
}