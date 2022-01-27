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
        this.entryBy = 1;
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
                    resolve(result[0]);
            });

        });
        return getData;
    }

    static searchShipment(key) {
        const getData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM imports_shipments_details WHERE AWB_no = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result[0]);
            });

        });
        return getData;
    }

    static modifyShipment(data) {
        data.details = JSON.stringify(data.details);

        const saveData = new Promise((resolve, reject) => {
            const query = `UPDATE imports_shipments_details SET AWB_no = ?, shipper = ?, consignee = ?, origin = ?, service = ?, service_provider = ?,details = ?,  is_billed = ?, bill_type = ? WHERE shipments_id = ?`;
            const values = [data.AWB_no, data.shipper, data.consignee, data.origin, data.service, data.service_provider, data.details, data.is_billed, data.bill_type, data.shipments_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
            });
        });

        return saveData;

    }
    static modifyImportShipmentAmts(data) {
        data.bill_details = JSON.stringify(data.bill_details);
        data.amounts_entered = 1;

        const saveData = new Promise((resolve, reject) => {
            const query = `UPDATE imports_shipments_details SET bill_details = ?, bill_type = ?, amounts_entered = ? WHERE shipments_id= ?`;
            const values = [data.bill_details, data.bill_type, data.amounts_entered, data.shipments_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
            });
        });

        return saveData;

    }
    static findImportShipmentAmtsNull() {
        const getData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM imports_shipments_details WHERE amounts_entered = 0`;
            dbConnection.query(query, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });

        });
        return getData;
    }

}