import { Router } from "express";
import { addNewShipmentDetails, getActiveStatusShipments, getShipmentDetails, searchShipments, updateShipmentsStatus } from "../../controllers/exportsShipmentsController.js";

const exportsShipmentsRoute = Router();

exportsShipmentsRoute.post('/', addNewShipmentDetails);
exportsShipmentsRoute.get('/id=:awbNo', getShipmentDetails);
exportsShipmentsRoute.get('/status_active', getActiveStatusShipments);
exportsShipmentsRoute.put('/update_status', updateShipmentsStatus);
exportsShipmentsRoute.get('/search', searchShipments);

export default exportsShipmentsRoute;