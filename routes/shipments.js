import { Router } from "express";
import { addNewClientDetails, getClientDetails } from "../controllers/clientController.js";


const router = Router();

router.post('/', addNewClientDetails);
router.get('/:emailId', getClientDetails);


export default router;