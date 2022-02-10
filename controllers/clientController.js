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
    const client = new ClientModel(req.body);
    try {
        const data = await client.save()
        res.status(202).send({ message: "Data Received" });
    }
    catch (err) {
        console.log(err);
        res.status(406).send({ message: { ...err } });

    }
}
export const searchClients = async (req, res, next) => {
    try {
        const data = await ClientModel.searchClients(req.query.s);
        if (data.length == 0)
            res.status(404).send({ message: "No Data Found!!!" });
        else
            res.send([...data]);

    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occurred!!!", ...err })
    }
}