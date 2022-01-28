import { Router } from "express";
import { addNewShipmentDetails, getActiveStatusShipments, getExportShipmentAmtsNull, getShipmentDetails, getExportShipmentUnverified, modifyDetails, modifyExportShipmentAmts, searchShipments, updateShipmentsStatus, getExportDetails, updateWeight, getShipmentDetails$Awb } from "../../controllers/exportsShipmentsController.js";

const exportsShipmentsRoute = Router();

exportsShipmentsRoute.post('/', addNewShipmentDetails);
exportsShipmentsRoute.get('/id=:shipments_id', getShipmentDetails);
exportsShipmentsRoute.get('/awbno=:AWB_no', getShipmentDetails$Awb);
exportsShipmentsRoute.get('/status_active', getActiveStatusShipments);
exportsShipmentsRoute.put('/update_status', updateShipmentsStatus);
exportsShipmentsRoute.get('/search', searchShipments);
exportsShipmentsRoute.put('/modify_details', modifyDetails);

exportsShipmentsRoute.put('/modify_shipment_amts', modifyExportShipmentAmts);
exportsShipmentsRoute.get('/shipment_amts_null', getExportShipmentAmtsNull);
exportsShipmentsRoute.get('/shipment_weight_unverified', getExportShipmentUnverified);
exportsShipmentsRoute.get('/shipment_details_id=:shipments_id', getExportDetails);
exportsShipmentsRoute.put('/update_weight', updateWeight);

export default exportsShipmentsRoute;