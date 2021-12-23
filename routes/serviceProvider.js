import { addNewServiceProvider, getAllServiceProvider, getServiceProvider } from "../controllers/serviceProviderController.js";
import { Router } from "express";

const serviceProviderRoute = Router();

serviceProviderRoute.route('/')
    .get(getAllServiceProvider)
    .post(addNewServiceProvider);

serviceProviderRoute.get('/:id', getServiceProvider);

export default serviceProviderRoute;