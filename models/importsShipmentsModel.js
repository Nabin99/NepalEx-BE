import dbConnection from "../dbConn/dbConn.js";

export default class ImportsShipmentsModel {
    constructor(data) {
        this.data = data;
        // this.documents = data.documents;
        this.data.details = JSON.stringify(this.data.details);
        this.data.entry_by = 1;
        this.data.is_billed = false;

    }
    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO imports_shipments (AWB_no, shipper_id, consignee, origin, service, service_provider_id,details, entry_by, is_billed)
            VALUES (?)`;
            const values = [[this.data.AWB_no, this.data.shipper_id, this.data.consignee, this.data.origin, this.data.service, this.data.service_provider_id, this.data.details, this.data.entry_by, this.data.is_billed]];
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
            const query = `SELECT * FROM imports_shipments`;
            dbConnection.query(query, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });

        });
        return getAllData;

    }
    static getDetails(key) {
        const getData = new Promise((resolve, reject) => {
            const query = `SELECT imports_shipments.shipments_id,imports_shipments.AWB_no,clients.name As shipper,client_id AS shipper_id,primary_email AS email_id,imports_shipments.consignee,imports_shipments.origin,imports_shipments.service,service_provider_id,imports_shipments.documents,imports_shipments.details FROM imports_shipments INNER JOIN clients ON clients.client_id = imports_shipments.shipper_id WHERE AWB_no = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });

        });
        return getData;
    }
    static modifyShipmentDetails(data) {
        data.details = JSON.stringify(data.details);

        const saveData = new Promise((resolve, reject) => {
            const query = `UPDATE imports_shipments SET AWB_no = ?, shipper_id = ?, consignee = ?, origin = ?, service = ?, service_provider_id = ?,details = ? WHERE shipments_id = ?`;
            const values = [data.AWB_no, data.shipper_id, data.consignee, data.origin, data.service, data.service_provider_id, data.details, data.shipments_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
            });
        });

        return saveData;

    }

    static searchShipment(key) {
        const getData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM imports_shipments WHERE AWB_no = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result[0]);
            });

        });
        return getData;
    }
    static searchShipmentAmts(key) {
        const getData = new Promise((resolve, reject) => {
            const query = `SELECT imports_shipments.shipments_id,imports_shipments.AWB_no,clients.name As shipper,client_id AS shipper_id,primary_email AS email_id,imports_shipments.consignee,imports_shipments.origin,imports_shipments.service,service_provider_id,bill_details,is_billed,bill_type,entry_date FROM imports_shipments INNER JOIN clients ON clients.client_id = imports_shipments.shipper_id WHERE AWB_no = ? AND amounts_entered = 1`;
            dbConnection.query(query, [key], (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });

        });
        return getData;
    }


    static modifyImportShipmentAmts(data) {
        data.bill_details = JSON.stringify(data.bill_details);
        data.amounts_entered = 1;

        const saveData = new Promise((resolve, reject) => {
            const query = `UPDATE imports_shipments SET bill_details = ?, bill_type = ?, amounts_entered = ? WHERE shipments_id= ?`;
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
            const query = `SELECT imports_shipments.shipments_id,imports_shipments.AWB_no,clients.name As shipper,primary_email AS email_id,imports_shipments.consignee,imports_shipments.origin,imports_shipments.service,service_provider_id,is_billed,bill_type,entry_date FROM imports_shipments INNER JOIN clients ON clients.client_id = imports_shipments.shipper_id WHERE amounts_entered = 0`;
            dbConnection.query(query, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });

        });
        return getData;
    }



    static getUserImports(key) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT shipments_id,AWB_no,consignee,origin,service, service_providers.name as service_provider,entry_date,bill_details,is_billed,bill_type FROM imports_shipments INNER JOIN service_providers ON imports_shipments.service_provider_id = service_providers.id WHERE shipper_id = ? and amounts_entered = 1`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result.map((value) => ({ ...value, bill_details: value.bill_details ? { ...JSON.parse(value.bill_details) } : null })));
                }
            });

        });

        return Data;
    }

}