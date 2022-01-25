import dbConnection from "../dbConn/dbConn.js";


class ExportsShipments {
    constructor(data) {
        this.awbNo = data.awbNo;
        this.status = data.status;
        this.shipperId = data.shipper;
        this.consignee = data.consignee;
        this.destination = data.destination;
        this.postalCode = data.postalCode;
        this.remoteArea = data.remoteArea;
        this.service = data.service;
        this.serviceProviderId = data.serviceProvider;
        this.shipmentType = data.shipmentType;
        //this.documents = data.image;
        this.details = JSON.stringify({
            box: data.box,
            overSize: data.overSize,
            ironStrip: data.ironStrip,
            plasticStrip: data.plasticStrip,
            actualWght: data.actualWght,
            dimWght: data.dimWght,
            customClearance: data.customClearance,
            appliedWeight: (data.actualWght > data.dimWght) ? data.actualWght : data.dimWght,
            dscptnOfGoods: data.dscptnOfGoods,
            invoiceVal: data.invoiceVal,
            customsVal: data.customsVal,
            excRate: data.excRate,
            remarks: data.remarks
        });
        this.entryBy = 1;
        this.weightVerified = false;
        this.isBilled = false;


    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO exports_shipments_details (AWB_no,status,shipper_id,consignee,destination,postal_code,remote_area,service,service_provider_id,shipment_type,details,entry_by,weight_verified,is_billed)
             VALUES (?)`;
            const values = [[this.awbNo, this.status, this.shipperId, this.consignee, this.destination, this.postalCode, this.remoteArea, this.service, this.serviceProviderId, this.shipmentType, this.details, this.entryBy, this.weightVerified, this.isBilled]];

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
            const values = [[data.status], [data.comment], [data.AWB_no]];
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
            const query = `SELECT * FROM exports_shipments_details WHERE status = ? OR AWB_no = ? OR entry_date<= ? OR service = ? OR service_provider_id = ? OR shipment_type = ? OR  remote_area = ? OR is_billed = ? OR  weight_verified = ? OR shipper_id = ?`;
            const values = [data.status, data.AWB_no, data.to, data.service, data.service_provider_id, data.shipment_type, data.remote_area, data.is_billed, data.weight_verified, data.shipper_id];
            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else {

                    resolve(result);
                }
            });

        });

        return Data;
    }

}
export default ExportsShipments;