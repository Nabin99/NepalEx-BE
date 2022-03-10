import ImportsModel from "../models/importsModel.js"

export const addNewImport = async (req, res, next) => {
    try {
        const importData = new ImportsModel(req.body);
        await importData.save();
        res.send({ message: "Successfully Added New Import with ppnumber " + req.body.pp_number });

    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
}

export const getAllImports = async (req, res, next) => {
    try {
        const data = await ImportsModel.findAll();
        if (data.length == 0)
            res.status(404).send({ message: "Import Not Found!!!" });
        else {

            res.send(data);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
}

export const getImport = async (req, res, next) => {
    try {
        const data = await ImportsModel.findOne(req.params.id);
        if (data.length == 0)
            res.status(404).send({ message: "Import Not Found!!!" });
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

export const searchImport = async (req, res, next) => {
    try {
        const data = await ImportsModel.searchImport(req.params.customs_PPN);
        if (data.length == 0)
            res.status(404).send({ message: "Import Not Found!!!" });
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

export const modifyImport = async (req, res, next) => {
    try {
        await ImportsModel.modifyImport(req.body);
        res.send({ message: "Successfully Updated Import with id " + req.body.imports_id });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
};


export const getShipmentsDate = async (req, res, next) => {
    try {

        let data = await ImportsModel.getShipmentsDate();

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

        let data = await ImportsModel.getBillStatusCount();

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

export const getAllUnBilledShipments = async (req, res, next) => {
    try {

        let data = await ImportsModel.getAllUnBilledShipments();

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
export const setBilled = async (req, res, next) => {
    try {

        await ImportsModel.setBilled(req.body);
        res.send({ message: `Successful` });

    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: "An Error Occured!!!", ...err });
    }
};