import { Router } from "express";
import { addNewShipmentDetails, getShipmentDetails } from "../../controllers/exportsShipmentsController.js";

const exportsShipmentsRoute = Router();

exportsShipmentsRoute.post('/', addNewShipmentDetails);
exportsShipmentsRoute.get('/:awbNo', getShipmentDetails);

export default exportsShipmentsRoute;