import { addNewImport, getAllImports, getImport, searchImport, modifyImport } from "../controllers/importsController.js";
import { Router } from "express";

const importsRoute = Router();

importsRoute.route('/')
    .get(getAllImports)
    .post(addNewImport);

importsRoute.get('/id=:id', getImport);
importsRoute.get('/search_customsppn=:customs_PPN', searchImport);
importsRoute.put('/modify_import', modifyImport);

export default importsRoute;