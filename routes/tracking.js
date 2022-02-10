import express from 'express';
import { getShipmentStatus } from '../controllers/exportsShipmentsController.js';

const router = express.Router();

router.get('/id=:AWB_no', getShipmentStatus);

export default router;