import ServiceProviderModel from "../models/serviceProviderModel.js";

export const addNewServiceProvider = async (req, res, next) => {
    try {
        const newServiceProvider = new ServiceProviderModel(req.body);
        res.send(await newServiceProvider.save());
    }
    catch (err) {
        res.send(err);
    }
}
export const getServiceProvider = async (req, res, next) => {
    try {
        res.send(await ServiceProviderModel.findOne(req.params.id));
    }
    catch (err) {
        res.send(err);
    }
}
export const getAllServiceProvider = async (req, res, next) => {
    try {
        const data = await ServiceProviderModel.findAll();
        if (data.length == 0)
            res.status(404).send({ message: "No Service Providers Found!!!" });
        else
            res.send(data);
        console.log([...data]);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occurred!!!", ...err });
    }
}