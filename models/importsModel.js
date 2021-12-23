import dbConnection from "../dbConn/dbConn.js";

export default class ImportsModel {
    constructor(data) {
        this.shipper = data.shipper;
        this.shipmentType = data.shipmentType;
        this.mAwbNo = data.mAwbNo;
        this.hAwbNo = data.hAwbNo;
        this.status = data.status;
        this.details = {
            noBox: data.box,
            acutalWght: data.acutalWght,
            value: data.value,
            duty_vat: data.duty_vat,
            extra1: data.extra1,
            extra2: data.extra2,
            extra3: data.extra3,
            extra4: data.extra4,
            extra5: data.extra5,
            transitWarehouse: data.transitWarehouse,
            ppPrint: data.ppPrint,
            labour: data.labour,
            panEntry: data.panEntry,
            others: data.others,
            Amount: data.Amount,
            remarks: data.remarks
        };
        this.finalizedDate = data.finalizedDate;
        this.ppNumber = data.ppNumber;
        this.isBilled = false;
        this.documents = data.documents;
        this.entries = {
            id: 'id',
            action: 'creation',
            date: new Date()
        }
    }
    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO imports (shipper,shipment_type,mawb_no,hawb_no,status,details,pp_number,is_billed,documents,entries)
            VALUES (?)`;
            const values = [[this.shipper, this.shipmentType, this.mAwbNo, this.hAwbNo, this.status, this.details, this.ppNumber, this.isBilled, this.documents, this.entries]];
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
        const getAllData = new Promise((resolve, reject) => {
            const query = `SELECT * FROM imports WHERE imports_id = ?`;
            dbConnection.query(query, [key], (err, result) => {
                if (err) reject(err);
                else
                    resolve(result);
            });
        });
        return getAllData;
    }
}