import ShipmentsModel from '../models/exportsShipmentsModels.js';

export const getAllShipmentsDetails = async (req, res, next) => {
    try {
        let data = await ShipmentsModel.findAll()
        data.clientInfo = JSON.parse(data.clientInfo);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
};

export const getShipmentDetails = async (req, res, next) => {
    try {
        let data = await ShipmentsModel.findOne(req.params.awbNo);
        data.details = JSON.parse(data.details);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
};

export const addNewShipmentDetails = async (req, res, next) => {
    const client = new ShipmentsModel(req.body);

    try {
        data = await client.save()
        res.send(data);

    }
    catch (err) {
        res.send(err);
    }
}