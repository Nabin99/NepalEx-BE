import { addNewImport, getAllImports, getImport } from "../controllers/importsController.js";
import { Router } from "express";

const importsRoute = Router();

importsRoute.route('/')
    .get(getAllImports)
    .post(addNewImport);

importsRoute.get('/:id', getImport);

export default importsRoute;