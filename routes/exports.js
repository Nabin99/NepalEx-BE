import { addNewExportsDetails, getAllExports, getExport, modifyExport } from "../controllers/exportsController.js";
import { Router } from "express";

const exportsRoute = Router();

exportsRoute.route('/')
    .get(getAllExports)
    .post(addNewExportsDetails);
exportsRoute.get('/search_customsppn=:customs_PPN', getExport);
exportsRoute.put('/modify_shipment', modifyExport)

export default exportsRoute;