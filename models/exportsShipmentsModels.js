import dbConnection from "../dbConn/dbConn.js";


class ExportsShipments {
    constructor(data) {
        this.data = { ...data, weight_verified: false, is_billed: false };
        this.data.details = JSON.stringify(this.data.details);
        this.data.entry_by = 1;
    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO exports_shipments (AWB_no,status,shipper_id,consignee,destination,postal_code,remote_area,service,service_provider_id,shipment_type,details,entry_by,weight_verified,is_billed,custom_clearance)
             VALUES (?)`;
            const values = [[this.data.AWB_no, this.data.status, this.data.shipper_id, this.data.consignee, this.data.destination, this.data.postal_code, this.data.remote_area, this.data.service, this.data.service_provider_id, this.data.shipment_type, this.data.details, this.data.entry_by, this.data.weight_verified, this.data.is_billed, this.data.custom_clearance]];

            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result[0]);
            });
        });

        return saveData;

    }
    static findAll() {
        const allData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM exports_shipments`;
            dbConnection.query(query, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
        });

        return allData;
    }
    static getShipmentDetail(key) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT AWB_no,status,clients.name AS shipper ,client_id, primary_email AS email_id,consignee,destination,postal_code,remote_area,service,service_provider_id,shipment_type,details,weight_verified,is_billed FROM exports_shipments INNER JOIN clients ON clients.client_id = exports_shipments.shipper_id WHERE AWB_no = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }


            });

        });

        return Data;
    }
    static modifyDetails(data) {
        data.details = JSON.stringify(data.details);
        const Data = new Promise((resolve, reject) => {
            const query = `UPDATE exports_shipments SET AWB_no= ?,status= ?,shipper_id= ?,consignee= ?,destination= ?,postal_code= ?,remote_area= ?,service= ?,service_provider_id= ?,shipment_type= ?,details= ?,weight_verified= ?,is_billed=? WHERE shipments_id= ?`;
            const values = [data.AWB_no, data.status, data.shipper_id, data.consignee, data.destination, data.postal_code, data.remote_area, data.service, data.service_provider_id, data.shipment_type, data.details, data.weight_verified, data.is_billed, data.shipments_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });

        });

        return Data;
    }

    static findOne(key) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT exports_shipments.AWB_no,exports_shipments.status,clients.name AS shipper,clients.primary_email AS shipper_id,exports_shipments.consignee,exports_shipments.destination,exports_shipments.remote_area,exports_shipments.service,service_providers.name AS service_provider,exports_shipments.shipment_type,exports_shipments.entry_date,exports_shipments.weight_verified,exports_shipments.is_billed, exports_shipments.details,exports_shipments.bill_no,exports_shipments.bill_type,exports_shipments.bill_details FROM ((exports_shipments INNER JOIN clients ON exports_shipments.shipper_id= clients.client_id)INNER JOIN service_providers ON exports_shipments.service_provider_id= service_providers.id) WHERE AWB_no = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }


            });

        });

        return Data;
    }
    static activeShipments() {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT exports_shipments.shipments_id,exports_shipments.AWB_no,exports_shipments.status,clients.name AS shipper,clients.primary_email AS email_id,exports_shipments.consignee,exports_shipments.destination,exports_shipments.remote_area,exports_shipments.service, service_provider_id,exports_shipments.shipment_type,exports_shipments.entry_date,exports_shipments.weight_verified,exports_shipments.is_billed,exports_shipments.bill_type,custom_clearance FROM ((exports_shipments INNER JOIN clients ON exports_shipments.shipper_id= clients.client_id)INNER JOIN service_providers ON exports_shipments.service_provider_id= service_providers.id) WHERE exports_shipments.status != "Delivered" and exports_shipments.status != "Returned"`;

            dbConnection.query(query, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });

        });

        return Data;
    }

    static updateStatus(data) {
        const Data = new Promise((resolve, reject) => {
            const query = `UPDATE exports_shipments SET status = ?,comment = ? WHERE shipments_id = ?`;
            const values = [data.status, data.comment, data.shipments_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else {

                    resolve(result);
                }
            });

        });

        return Data;
    }

    static searchShipments(data) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT * FROM exports_shipments WHERE AWB_no = ? OR shipper_id = ?`;
            const values = [data.AWB_no, data.shipper_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });

        });

        return Data;
    }



    static modifyExportShipmentAmts(data) {
        data.bill_details = JSON.stringify(data.bill_details);
        data.amounts_entered = 1;

        const saveData = new Promise((resolve, reject) => {
            const query = `UPDATE exports_shipments SET bill_details = ?, bill_type = ?, amounts_entered = ? WHERE shipments_id= ?`;
            const values = [data.bill_details, data.bill_type, data.amounts_entered, data.shipments_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
            });
        });

        return saveData;

    }
    static findExportShipmentAmtsNull() {
        const getData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM exports_shipments WHERE amounts_entered = 0`;
            dbConnection.query(query, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });

        });
        return getData;
    }
    static findExportShipmentUnverified() {
        const getData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM exports_shipments WHERE weight_verified = 0`;
            dbConnection.query(query, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });

        });
        return getData;
    }

    static getExportDetails(key) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT details FROM exports_shipments WHERE shipments_id = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result[0]);
                }


            });

        });

        return Data;
    }

    static updateWeight(data) {
        data.details = JSON.stringify(data.details);
        data.weight_verified = 1;
        const Data = new Promise((resolve, reject) => {
            const query = `UPDATE exports_shipments SET details= ? ,bill_type =?, weight_verified = ? WHERE shipments_id= ?`;
            const values = [data.details, data.bill_type, data.weight_verified, data.shipments_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });

        });

        return Data;
    }

    static getShipmentStatus(key) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT status FROM exports_shipments WHERE AWB_no = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result[0]);
                }


            });

        });

        return Data;
    }


}
export default ExportsShipments;