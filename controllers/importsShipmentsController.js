import ImportsShipmentsModel from "../models/importsShipmentsModel.js";

export const addNewImport = async (req, res, next) => {
    try {
        const newImport = new ImportsShipmentsModel(req.body);

        await newImport.save()
        res.status(201).send({ message: "Successfully Added New Shipment" });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occurred!!!", ...err });
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

export const getShipmentDetails = async (req, res, next) => {
    try {
        const data = await ImportsShipmentsModel.getDetails(req.params.AWB_no);
        if (data.length == 0)
            res.status(404).send({ message: `Shipment With AWB No.${req.params.AWB_no} Not Found!!!` });
        else {
            data[0].details = JSON.parse(data[0].details);
            res.send(data[0]);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occurred!!!", ...err });
    }
}

export const searchImportShipment = async (req, res, next) => {
    try {
        const data = await ImportsShipmentsModel.searchShipment(req.params.AWB_no);
        console.log(data);
        if (data.length == 0)
            res.status(404).send({ message: "Shipment With AWB No. " + req.params.AWB_no + " Not Found!!!" })
        else {
            data[0].details = JSON.parse(data[0].details);
            data[0].bill_details = JSON.parse(data[0].bill_details);

            res.send(data[0]);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occurred!!!", ...err });
    }
}
export const searchImportShipmentAmts = async (req, res, next) => {
    try {
        const data = await ImportsShipmentsModel.searchShipmentAmts(req.params.AWB_no);
        if (data.length == 0)
            res.status(404).send({ message: "Shipment With AWB No. " + req.params.AWB_no + " Not Found or Unavailable For Modification !!!" });
        else {
            data[0].bill_details = JSON.parse(data[0].bill_details);
            res.send(data[0]);
        }
    }
    catch (err) {
        console.log(err);
        res.status.send({ message: "An Error Occurred!!!", ...err });
    }
}

export const modifyImportShipmentDetails = async (req, res, next) => {
    try {
        await ImportsShipmentsModel.modifyShipmentDetails(req.body);
        res.send({ message: "Successfully Updated Shipment With id: " + req.body.shipments_id });
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occurred!!!", ...err });
    }
}

export const modifyImportShipmentAmts = async (req, res, next) => {
    try {
        await ImportsShipmentsModel.modifyImportShipmentAmts(req.body);
        res.send({ message: "Successfully Updated Shipment With id: " + req.body.shipments_id });
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occurred!!!", ...err });
    }
}

export const getImportShipmentAmtsNull = async (req, res, next) => {
    try {
        const data = await ImportsShipmentsModel.findImportShipmentAmtsNull();
        if (data.length == 0)
            res.status(404).send({ message: "Shipments Not Found!!!" });
        else {
            console.log(data);
            res.send(data);
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occurred!!!", ...err });
    }
}

export const getShipmentsDate = async (req, res, next) => {
    try {

        let data = await ImportsShipmentsModel.getShipmentsDate();

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

        let data = await ImportsShipmentsModel.getBillStatusCount();

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