import ImportsModel from "../models/importsModel.js"

export const addNewImport = async (req, res, next) => {
    try {
        const importData = new ImportsModel(req.body);
        console.log(req.body);
        res.send(await importData.save());

    }
    catch (err) {
        console.log(err);
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
        const data = await ImportsModel.findOne(req.params.id);
        data.details = JSON.parse(data.details);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}

export const searchImport = async (req, res, next) => {
    try {
        const data = await ImportsModel.searchImport(req.query);
        data.details = JSON.parse(data.details);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}

export const modifyImport = async (req, res, next) => {
    try {
        console.log(req.body)
        const data = await ImportsModel.modifyImport(req.body);
        console.log(data)
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err)
        res.send(err);
    }
}