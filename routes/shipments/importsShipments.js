import { getAllImports, getImport, addNewImport, searchImportShipment, modifyImportShipment } from "../../controllers/importsShipmentsController.js";
import { Router } from "express";

const importsShipmentsRoute = Router();

importsShipmentsRoute.post('/', addNewImport);

importsShipmentsRoute.get('/search_id=:shipment_id', getImport);
importsShipmentsRoute.get('/search_awbno=:AWB_no', searchImportShipment);
importsShipmentsRoute.put('/modify_shipment', modifyImportShipment);

export default importsShipmentsRoute;