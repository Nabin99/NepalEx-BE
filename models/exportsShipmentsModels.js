import dbConnection from "../dbConn/dbConn.js";


class ExportsShipments {
    constructor(data) {
        this.awbNo = data.awbNo;
        this.status = data.status;
        this.shipperId = data.shipperId;
        this.consignee = data.consignee;
        this.destination = data.destination;
        this.postalCode = data.postalCode;
        this.remoteArea = data.remoteArea;
        this.service = data.service;
        this.serviceProviderId = data.serviceProviderId;
        this.shipmentType = data.shipmentType;
        this.documents = data.image;
        this.details = {
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
        };
        this.weightVerified = false;
        this.isBilled = false;
        this.entries = [
            {
                id: 'id',
                action: 'create',
                date: new Date()
            }
        ];


    }

    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO exports_shipments_details (AWB_no,status,shipper_id,consignee,destination,postal_code,remote_area,service,service_provider_id,shipment_type,documents,details,weight_verified,is_billed,entries)
             VALUES (?)`;
            const values = [[this.awbNo, this.status, this.shipperId, this.consignee, this.destination, this.postalCode, this.remoteArea, this.service, this.serviceProviderId, this.shipmentType, this.documents, this.details, this.weightVerified, this.isBilled, this.entries]];

            dbConnection.query(query, values, (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
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

}
export default ExportsShipments;