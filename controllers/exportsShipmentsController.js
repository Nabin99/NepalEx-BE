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

        let data = await ExportsShipments.findOne(req.params.awbNo);
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