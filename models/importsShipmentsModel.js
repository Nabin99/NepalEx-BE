import dbConnection from "../dbConn/dbConn.js";

export default class ImportsShipmentsModel {
    constructor(data) {
        this.awbNo = data.awbNo;
        this.shipper = data.shipper;
        this.consignee = data.consignee;
        this.origin = data.origin;
        this.service = data.service;
        this.serviceProvider = data.serviceProvider;
        // this.documents = data.documents;
        this.details = JSON.stringify(data.details);
        this.entryBy = 'employee';
        this.isBilled = false;

    }
    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO imports_shipments_details (AWB_no, shipper, consignee, origin, service, service_provider,details, entry_by, is_billed)
            VALUES (?)`;
            const values = [[this.awbNo, this.shipper, this.consignee, this.origin, this.service, this.serviceProvider, this.details, this.entryBy, this.isBilled]];
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
            const query = `SELECT * FROM imports_shipments_details`;
            dbConnection.query(query, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });

        });
        return getAllData;

    }
    static findOne(key) {
        const getData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM imports_shipments_details WHERE shipments_id = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });

        });
        return getData;
    }
}