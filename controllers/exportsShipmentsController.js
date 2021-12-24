import ShipmentsModel from '../models/exportsShipmentsModels.js';

export const getAllShipmentsDetails = async (req, res, next) => {
    try {
        let data = await ShipmentsModel.findAll();
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
};

export const getShipmentDetails = async (req, res, next) => {
    try {
        let data = await ShipmentsModel.findOne(req.params.awbNo);
        console.log(data)
        res.send(data);
    }
    catch (err) {
        console.log(err)
        res.send(err);

    }
};

export const addNewShipmentDetails = async (req, res, next) => {
    const client = new ShipmentsModel(req.body);

    try {
        console.log(req.body);
        let data = await client.save()
        res.send(data);


    }
    catch (err) {
        console.log(err);
        res.send(err);

    }
}