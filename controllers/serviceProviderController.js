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
        res.send(ServiceProviderModel.findAll());
    }
    catch (err) {
        res.send(err);
    }
}