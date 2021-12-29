import { Router } from "express";
import { authenticateUserToken } from "../authentication/userAuth.js";
import authorizeAccess from "../authorization/authorizationPolicy.js";
import { addNewClientDetails, getClientDetails } from "../controllers/clientController.js";

const router = Router();

router.post('/', addNewClientDetails);
router.get('/:emailId', authenticateUserToken, authorizeAccess, getClientDetails);


export default router;