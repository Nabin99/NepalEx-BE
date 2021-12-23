import { getAllImports, getImport, addNewImport } from "../../controllers/importsShipmentsController.js";
import { Router } from "express";

const importsShipmentsRoute = Router();

importsShipmentsRoute.route('/')
    .get(getAllImports)
    .post(addNewImport);

importsShipmentsRoute.get('/:id', getImport);

export default importsShipmentsRoute;