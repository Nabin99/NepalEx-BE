import { Router } from "express";
import { addNewShipmentDetails, getWeightDetails, getBillStatusCount, getActiveStatusShipments, getExportShipmentAmtsNull, getShipmentDetails, getExportShipmentUnverified, modifyDetails, modifyExportShipmentAmts, updateShipmentsStatus, getExportAmtsDetails, updateWeight, getShipment, getStatusCount, getShipmentsDate } from "../../controllers/exportsShipmentsController.js";

const exportsShipmentsRoute = Router();

exportsShipmentsRoute.post('/', addNewShipmentDetails);
exportsShipmentsRoute.get('/search/awbno=:AWB_no', getShipment);

exportsShipmentsRoute.get('/status/active', getActiveStatusShipments);
exportsShipmentsRoute.put('/status/update', updateShipmentsStatus);

exportsShipmentsRoute.get('/details/awbno=:AWB_no', getShipmentDetails);
exportsShipmentsRoute.put('/modify_details', modifyDetails);

exportsShipmentsRoute.put('/modify_shipment_amts', modifyExportShipmentAmts);
exportsShipmentsRoute.get('/shipment_amts_null', getExportShipmentAmtsNull);
exportsShipmentsRoute.get('/shipment_billdetails_awbno=:AWB_no', getExportAmtsDetails);

exportsShipmentsRoute.put('/update_weight', updateWeight);
exportsShipmentsRoute.get('/shipment_weight_unverified', getExportShipmentUnverified);
exportsShipmentsRoute.get('/weight_details_id=:shipments_id', getWeightDetails);


exportsShipmentsRoute.get('/status_count', getStatusCount);
exportsShipmentsRoute.get('/shipments_date', getShipmentsDate);

exportsShipmentsRoute.get('/bill_status_count', getBillStatusCount);

export default exportsShipmentsRoute;