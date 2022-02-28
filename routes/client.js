import { Router } from "express";
import { authenticateUserToken } from "../authentication/userAuth.js";
import authorizeAccess from "../authorization/authorizationPolicy.js";
import { addNewClientDetails, getClientDetails, getExportShipments, getImportShipments, searchClients } from "../controllers/clientController.js";

const router = Router();

router.post('/', addNewClientDetails);
router.get('/email=:emailId', authenticateUserToken, authorizeAccess, getClientDetails);
router.get('/search', searchClients);
router.get('/shipments/exports_client=:client', getExportShipments);
router.get('/shipments/imports_client=:client', getImportShipments);


export default router;