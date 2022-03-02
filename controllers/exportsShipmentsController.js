
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

        let data = await ExportsShipments.getShipmentDetail(req.params.AWB_no);
        if (data.length == 0)
            res.status(404).send({ message: `Shipment With AWB No.${req.params.AWB_no} Not Found!!!` });
        else {
            data[0].details = JSON.parse(data[0].details);
            res.send(data[0]);
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
};
export const modifyDetails = async (req, res, next) => {
    try {
        await ExportsShipments.modifyDetails(req.body);
        res.send({ message: "Successfully Updated Shipment With id: " + req.body.shipments_id });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occurred!!!", ...err });
    }
};

export const getShipmentStatus = async (req, res, next) => {
    try {
        let data = await ExportsShipments.getShipmentStatus(req.params.AWB_no);
        if (data.length == 0)
            res.status(404).send({ message: "Shipment Not Found!!!" });
        else
            res.send(data[0]);
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occurred!!!" });

    }
};

export const addNewShipmentDetails = async (req, res, next) => {
    const shimpentDetails = new ExportsShipments(req.body);

    try {
        await shimpentDetails.save()
        res.status(201).send({ message: "Successfully Added Shipment With AWB No.: " + req.body.AWB_no });

    }
    catch (err) {
        res.status(400).send({ message: "An Error Occured!!!", ...err });

    }
}

export const getShipment = async (req, res, next) => {
    try {

        let data = await ExportsShipments.findOne(req.params.AWB_no);
        if (data.length == 0)
            res.status(404).send({ message: "Shipment Not Found!!!" });
        else {
            data[0].details = JSON.parse(data[0].details);
            data[0].bill_details = JSON.parse(data[0].bill_details);
            res.send(data[0]);
        }
    }
    catch (err) {
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
};

export const getActiveStatusShipments = async (req, res, next) => {

    try {
        let data = await ExportsShipments.activeShipments();
        if (data.length == 0)
            res.status(404).send({ message: "No Active Shipments Found!!!" });
        else
            res.send(data);

    }
    catch (err) {
        res.status(400).send({ message: "An Error Occuured!!!", ...err });

    }
}
export const updateShipmentsStatus = async (req, res, next) => {

    try {
        await ExportsShipments.updateStatus(req.body);
        res.status(202).send({ message: "Successfully Updated Shipment with id " + req.body.shipments_id });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
}



export const modifyExportShipmentAmts = async (req, res, next) => {
    try {
        await ExportsShipments.modifyExportShipmentAmts(req.body);
        res.send({ message: "Successfully Updated Shipment with id " + req.body.shipments_id });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
}

export const getExportShipmentAmtsNull = async (req, res, next) => {
    try {
        const data = await ExportsShipments.findExportShipmentAmtsNull();
        if (data.length == 0)
            res.status(404).send({ message: "No Shipments With Empty Amounts Details Found!!!" });
        else
            res.send(data);
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
}
export const getExportShipmentUnverified = async (req, res, next) => {
    try {
        const data = await ExportsShipments.findExportShipmentUnverified();
        if (data.length == 0)
            res.status(404).send({ message: "No Shipments Found With Pending Weight Verification!!!" });
        else
            res.send(data);
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
}
export const getExportAmtsDetails = async (req, res, next) => {
    try {
        const data = await ExportsShipments.getExportAmtsDetails(req.params.AWB_no);
        if (data.length == 0)
            res.status(404).send({ message: "Shipment With ID " + req.params.AWB_no + " Not Found or Unavailable For Modification!!!" })
        else {
            data[0].bill_details = JSON.parse(data[0].bill_details);
            data[0].details = JSON.parse(data[0].details);
            res.send(data[0]);
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
}

export const updateWeight = async (req, res, next) => {
    try {
        await ExportsShipments.updateWeight(req.body);
        res.status(202).send({ message: "Successfully Updated Shipment with id " + req.body.shipments_id });
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
}

export const getWeightDetails = async (req, res, next) => {
    try {

        let data = await ExportsShipments.getWeightDetails(req.params.shipments_id);

        if (data.length == 0)
            res.status(404).send({ message: `Shipment With AWB No.${req.params.shipments_id} Not Found!!!` });
        else {
            data[0].details = JSON.parse(data[0].details);
            res.send(data[0]);
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
};
export const getStatusCount = async (req, res, next) => {
    try {

        let data = await ExportsShipments.getStatusCount();

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

export const getShipmentsDate = async (req, res, next) => {
    try {

        let data = await ExportsShipments.getShipmentsDate();

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

        let data = await ExportsShipments.getBillStatusCount();

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
