import ImportsModel from "../models/importsModel.js"

export const addNewImport = async (req, res, next) => {
    try {
        const importData = new ImportsModel(req.body);
        res.send(await importData.save());

    }
    catch (err) {
        res.send(err);
    }
}

export const getAllImports = async (req, res, next) => {
    try {
        res.send(await ImportsModel.findAll());
    }
    catch (err) {
        res.send(err);
    }
}

export const getImport = async (req, res, next) => {
    try {
        res.send(await ImportsModel.findOne());
    }
    catch (err) {
        res.send(err);
    }
}