import ExportsModel from "../models/exportsModels.js";

export const addNewExportsDetails = async (req, res, next) => {
    try {
        const newExport = new ExportsModel(req.body);
        await newExport.save();
        res.send({ message: "Successfully Added New Export With customs ppn number " + req.body.customs_PPN });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occured!!!", ...err });
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
        const data = await ExportsModel.findOne(req.params.customs_PPN);
        if (data.length == 0)
            res.status(404).send({ message: "Export Not Found!!!" });
        else {
            data[0].details = JSON.parse(data[0].details);
            res.send(data[0]);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
}

export const modifyExport = async (req, res, next) => {
    try {
        console.log(req.body)
        await ExportsModel.modifyExport(req.body);
        res.send({ message: "Successfully Updated Imports With id " + req.body.exports_id });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
};


export const getShipmentsDate = async (req, res, next) => {
    try {

        let data = await ExportsModel.getShipmentsDate();

        if (data.length == 0)
            res.status(404).send({ message: `No Shipments` });
        else {
            res.send(data);
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
};
export const getBillStatusCount = async (req, res, next) => {
    try {

        let data = await ExportsModel.getBillStatusCount();

        if (data.length == 0)
            res.status(404).send({ message: `No Shipments` });
        else {
            res.send(data);
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
};