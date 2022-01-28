import ExportsShipments from '../models/exportsShipmentsModels.js';

export const getAllShipmentsDetails = async (req, res, next) => {
    try {
        let data = await ExportsShipments.findAll();
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
};

export const getShipmentDetails = async (req, res, next) => {
    try {

        let data = await ExportsShipments.findOne(req.params.shipments_id);
        data.details = JSON.parse(data.details);
        res.send(data);
    }
    catch (err) {
        console.log(err)
        res.send(err);

    }
};

export const addNewShipmentDetails = async (req, res, next) => {
    const shimpentDetails = new ExportsShipments(req.body);

    try {
        let data = await shimpentDetails.save()
        res.send(data);


    }
    catch (err) {
        console.log(err);
        res.send(err);

    }
}

export const getActiveStatusShipments = async (req, res, next) => {

    try {
        let data = await ExportsShipments.activeShipments();
        res.send(data);

    }
    catch (err) {
        console.log(err);
        res.send(err);

    }
}
export const updateShipmentsStatus = async (req, res, next) => {

    try {
        let data = await ExportsShipments.updateStatus(req.body);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}
export const searchShipments = async (req, res, next) => {

    try {
        let data = await ExportsShipments.searchShipments(req.query);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}

export const modifyDetails = async (req, res, next) => {
    console.log(req.body);
    try {
        let data = await ExportsShipments.modifyDetails(req.body);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}

export const modifyExportShipmentAmts = async (req, res, next) => {
    try {
        const data = await ExportsShipments.modifyExportShipmentAmts(req.body);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}

export const getExportShipmentAmtsNull = async (req, res, next) => {
    try {
        const data = await ExportsShipments.findExportShipmentAmtsNull();
        res.send(data);
    }
    catch (err) {
        console.log(err)
        res.send(err);
    }
}
export const getExportShipmentUnverified = async (req, res, next) => {
    try {
        const data = await ExportsShipments.findExportShipmentUnverified();
        res.send(data);
    }
    catch (err) {
        console.log(err)
        res.send(err);
    }
}
export const getExportDetails = async (req, res, next) => {
    try {
        const data = await ExportsShipments.getExportDetails(req.params.shipments_id);
        data.details = JSON.parse(data.details);
        res.send(data);
    }
    catch (err) {
        console.log(err)
        res.send(err);
    }
}

export const updateWeight = async (req, res, next) => {
    console.log(req.body);
    try {
        let data = await ExportsShipments.updateWeight(req.body);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}

export const getShipmentDetails$Awb = async (req, res, next) => {
    try {

        let data = await ExportsShipments.findOne$Awb(req.params.AWB_no);
        data.bill_details = JSON.parse(data.bill_details);
        console.log(data)
        res.send(data);
    }
    catch (err) {
        console.log(err)
        res.send(err);

    }
};