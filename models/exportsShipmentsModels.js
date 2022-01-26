import dbConnection from "../dbConn/dbConn.js";


class ExportsShipments {
    constructor(data) {
        this.data = { ...data, weight_verified: false, is_billed: false };
        this.data.details = JSON.stringify(this.data.details);
        this.data.entry_by = 1;
    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO exports_shipments_details (AWB_no,status,shipper_id,consignee,destination,postal_code,remote_area,service,service_provider_id,shipment_type,details,entry_by,weight_verified,is_billed,custom_clearance)
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
            const query = `SELECT * FROM exports_shipments_details`;
            dbConnection.query(query, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
        });

        return allData;
    }
    static findOne(key) {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT * FROM exports_shipments_details WHERE AWB_no = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result[0]);
                }


            });

        });

        return Data;
    }
    static activeShipments() {
        const Data = new Promise((resolve, reject) => {
            const query = `SELECT exports_shipments_details.shipments_id,exports_shipments_details.AWB_no,exports_shipments_details.status,client_details.primary_email,exports_shipments_details.consignee,exports_shipments_details.destination,exports_shipments_details.remote_area,exports_shipments_details.service,exports_shipments_details.service_provider_id,exports_shipments_details.shipment_type,exports_shipments_details.entry_date,exports_shipments_details.weight_verified,exports_shipments_details.is_billed FROM ((exports_shipments_details INNER JOIN client_details ON exports_shipments_details.shipper_id= client_details.client_id)) WHERE exports_shipments_details.status != "Delivered" and exports_shipments_details.status != "Returned"`;

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
            const query = `UPDATE exports_shipments_details SET status = ?,comment = ? WHERE AWB_no = ?`;
            const values = [data.status, data.comment, data.AWB_no];
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
            const query = `SELECT * FROM exports_shipments_details WHERE AWB_no = ? OR shipper_id = ?`;
            const values = [data.AWB_no, data.shipper_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else {
                    console.log(result)
                    resolve(result);
                }
            });

        });

        return Data;
    }

    static modifyDetails(data) {
        console.log(data)
        data.details = JSON.stringify(data.details);
        const Data = new Promise((resolve, reject) => {
            const query = `UPDATE exports_shipments_details SET AWB_no= ?,status= ?,shipper_id= ?,consignee= ?,destination= ?,postal_code= ?,remote_area= ?,service= ?,service_provider_id= ?,shipment_type= ?,details= ?,weight_verified= ?,is_billed=? WHERE AWB_no= ?`;
            const values = [data.AWB_no, data.status, data.shipper_id, data.consignee, data.destination, data.postal_code, data.remote_area, data.service, data.service_provider_id, data.shipment_type, data.details, data.weight_verified, data.is_billed, data.id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else {
                    console.log(result)
                    resolve(result);
                }
            });

        });

        return Data;
    }

}
export default ExportsShipments;