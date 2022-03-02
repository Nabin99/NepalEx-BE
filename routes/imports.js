import { addNewImport, getAllImports, getShipmentsDate, getBillStatusCount, getImport, searchImport, modifyImport } from "../controllers/importsController.js";
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
export default importsRoute;