import { Router } from "express";
import { addNewShipmentDetails, getActiveStatusShipments, getShipmentDetails, modifyDetails, searchShipments, updateShipmentsStatus } from "../../controllers/exportsShipmentsController.js";

const exportsShipmentsRoute = Router();

exportsShipmentsRoute.post('/', addNewShipmentDetails);
exportsShipmentsRoute.get('/awbno=:awbNo', getShipmentDetails);
exportsShipmentsRoute.get('/status_active', getActiveStatusShipments);
exportsShipmentsRoute.put('/update_status', updateShipmentsStatus);
exportsShipmentsRoute.get('/search', searchShipments);
exportsShipmentsRoute.put('/modify_details', modifyDetails);

export default exportsShipmentsRoute;