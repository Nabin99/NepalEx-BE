import { getAllImports, getImport, addNewImport, searchImportShipment, modifyImportShipment, getImportShipmentAmtsNull, modifyImportShipmentAmts } from "../../controllers/importsShipmentsController.js";
import { Router } from "express";

const importsShipmentsRoute = Router();

importsShipmentsRoute.post('/', addNewImport);

importsShipmentsRoute.get('/search_id=:shipment_id', getImport);
importsShipmentsRoute.get('/search_awbno=:AWB_no', searchImportShipment);
importsShipmentsRoute.get('/search_awbno=:AWB_no', searchImportShipment);
importsShipmentsRoute.put('/modify_shipment', modifyImportShipment);
importsShipmentsRoute.put('/modify_shipment_amts', modifyImportShipmentAmts);
importsShipmentsRoute.get('/shipment_amts_null', getImportShipmentAmtsNull);

export default importsShipmentsRoute;