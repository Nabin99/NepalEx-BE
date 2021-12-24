import ExportsModel from "../models/exportsModels.js";

export const addNewExportsDetails = async (req, res, next) => {
    try {
        const newExport = new ExportsModel(req.body);
        console.log(req.body);
        const data = await newExport.save();
        res.send(data);
        console.log(data);
    }
    catch (err) {
        console.log(err);
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
        res.send(await ExportsModel.findOne(req.params.id));
    }
    catch (err) {
        res.send(err);
    }
}