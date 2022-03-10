import { addNewExportsDetails, getShipmentsDate, getAllUnBilledShipments, setBilled, getBillStatusCount, getAllExports, getExport, modifyExport } from "../controllers/exportsController.js";
import { Router } from "express";

const exportsRoute = Router();

exportsRoute.route('/')
    .get(getAllExports)
    .post(addNewExportsDetails);
exportsRoute.get('/search_customsppn=:customs_PPN', getExport);
exportsRoute.put('/modify_shipment', modifyExport);

exportsRoute.get('/shipments_date', getShipmentsDate);

exportsRoute.get('/bill_status_count', getBillStatusCount);

exportsRoute.get('/bill/details', getAllUnBilledShipments);
exportsRoute.post('/bill/setBilled', setBilled);

export default exportsRoute;