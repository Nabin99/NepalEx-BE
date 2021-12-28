import { Router } from "express";
import { authenticateUserToken } from "../authentication/userAuth.js";
import { addNewClientDetails, getClientDetails } from "../controllers/clientController.js";

const router = Router();

router.post('/', addNewClientDetails);
router.get('/:emailId', authenticateUserToken, getClientDetails);


export default router;