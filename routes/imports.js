import { addNewImport, getAllImports, getAllUnBilledShipments, setBilled, getShipmentsDate, getBillStatusCount, getImport, searchImport, modifyImport } from "../controllers/importsController.js";
import { Router } from "express";

const importsRoute = Router();

importsRoute.route('/')
    .get(getAllImports)
    .post(addNewImport);

importsRoute.get('/id=:id', getImport);
importsRoute.get('/search_customsppn=:customs_PPN', searchImport);
importsRoute.put('/modify_import', modifyImport);

importsRoute.get('/shipments_date', getShipmentsDate);

importsRoute.get('/bill_status_count', getBillStatusCount);

importsRoute.get('/bill/details', getAllUnBilledShipments);
importsRoute.post('/bill/setBilled', setBilled);

export default importsRoute;