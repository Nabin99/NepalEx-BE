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
        res.send(await ImportsShipmentsModel.findOne());
    }
    catch (err) {
        res.send(err);
    }
}