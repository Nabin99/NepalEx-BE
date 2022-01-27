import ImportsShipmentsModel from "../models/importsShipmentsModel.js";

export const addNewImport = async (req, res, next) => {
    try {
        const newImport = new ImportsShipmentsModel(req.body);
        console.log(req.body);
        res.send(await newImport.save());
    }
    catch (err) {
        console.log(err);
        res.send(err);

    }
}

export const getAllImports = async (req, res, next) => {
    try {
        res.send(await ImportsShipmentsModel.findAll());
    }
    catch (err) {
        res.send(err);
    }
}

export const getImport = async (req, res, next) => {
    try {
        const data = await ImportsShipmentsModel.findOne(req.params.shipment_id);
        data.details = JSON.parse(data.details);
        res.send();
    }
    catch (err) {
        res.send(err);
    }
}

export const searchImportShipment = async (req, res, next) => {
    try {
        const data = await ImportsShipmentsModel.searchShipment(req.params.AWB_no);
        console.log(data);
        data.details = JSON.parse(data.details);

        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}

export const modifyImportShipment = async (req, res, next) => {
    try {
        const data = await ImportsShipmentsModel.modifyShipment(req.body);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}

export const modifyImportShipmentAmts = async (req, res, next) => {
    try {
        const data = await ImportsShipmentsModel.modifyImportShipmentAmts(req.body);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}

export const getImportShipmentAmtsNull = async (req, res, next) => {
    try {
        const data = await ImportsShipmentsModel.findImportShipmentAmtsNull();
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}