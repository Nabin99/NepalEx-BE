import { getShipmentDetails, addNewImport, searchImportShipment, getImportShipmentAmtsNull, modifyImportShipmentAmts, searchImportShipmentAmts, modifyImportShipmentDetails } from "../../controllers/importsShipmentsController.js";
import { Router } from "express";

const importsShipmentsRoute = Router();

importsShipmentsRoute.post('/', addNewImport);
importsShipmentsRoute.get('/search/awbno=:AWB_no', searchImportShipment);

importsShipmentsRoute.get('/details/awbno=:AWB_no', getShipmentDetails);
importsShipmentsRoute.put('/modify_shipment', modifyImportShipmentDetails);


importsShipmentsRoute.get('/searchamts_awbno=:AWB_no', searchImportShipmentAmts);
importsShipmentsRoute.put('/modify_shipment_amts', modifyImportShipmentAmts);
importsShipmentsRoute.get('/shipment_amts_null', getImportShipmentAmtsNull);

export default importsShipmentsRoute;