import { addNewExportsDetails, getAllExports, getExport } from "../controllers/exportsController.js";
import { Router } from "express";

const exportsRoute = Router();

exportsRoute.route('/')
    .get(getAllExports)
    .post(addNewExportsDetails);
exportsRoute.get('/:id');

export default exportsRoute;