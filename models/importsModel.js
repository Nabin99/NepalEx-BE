import dbConnection from "../dbConn/dbConn.js";

export default class ImportsModel {
    constructor(data) {
        this.shipper = data.shipper;
        this.shipmentType = data.shipmentType;
        this.mAwbNo = data.mAwbNo;
        this.hAwbNo = data.hAwbNo;
        this.status = data.status;
        this.details = JSON.stringify(data.details);
        this.entryBy = 'employee';
        this.ppNumber = data.ppNumber;
        this.isBilled = false;
        //this.documents = data.documents;
    }
    save() {
        const saveData = new Promise((resolve, reject) => {
            const query = `INSERT INTO imports (shipper,shipment_type,mawb_no,hawb_no,status,details,entry_by,pp_number,is_billed)
             VALUES (?)`;

            const values = [[this.shipper, this.shipmentType, this.mAwbNo, this.hAwbNo, this.status, this.details, this.entryBy, this.ppNumber, this.isBilled]];
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
                    resolve(result[0]);
            });
        });
        return getData;
    }
}