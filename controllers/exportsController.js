import ExportsModel from "../models/exportsModels.js";

export const addNewExportsDetails = async (req, res, next) => {
    try {
        const newExport = new ExportsModel(req.body);
        const data = await newExport.save();
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}

export const getAllExports = async (req, res, next) => {
    try {
        res.send(await ExportsModel.findAll());
    }
    catch (err) {
        res.send(err);
    }
}

export const getExport = async (req, res, next) => {
    try {
        res.send(await ExportsModel.findOne(req.parms.emailId));
    }
    catch (err) {
        res.send(err);
    }
}