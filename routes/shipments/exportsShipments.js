import { Router } from "express";
import { addNewShipmentDetails, getActiveStatusShipments, getShipmentDetails } from "../../controllers/exportsShipmentsController.js";

const exportsShipmentsRoute = Router();

exportsShipmentsRoute.post('/', addNewShipmentDetails);
exportsShipmentsRoute.get('/id=:awbNo', getShipmentDetails);
exportsShipmentsRoute.get('/status_active', getActiveStatusShipments);

export default exportsShipmentsRoute;