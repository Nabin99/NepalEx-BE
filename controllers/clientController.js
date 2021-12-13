import ClientModel from '../models/clientModels.js';

export const getAllClientsDetails = async (req, res, next) => {
    try {
        let data = await ClientModel.findAll()
        data.clientInfo = JSON.parse(data.clientInfo);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
};

export const getClientDetails = async (req, res, next) => {
    try {
        let data = await ClientModel.findOne(req.params.emailId);
        data.clientInfo = JSON.parse(data.clientInfo);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
};

export const addNewClientDetails = async (req, res, next) => {
    console.log(req.body)
    const client = new ClientModel(req.body);


    try {
        data = await client.save()
        res.send(data);

    }
    catch (err) {
        res.send(err);
    }
}