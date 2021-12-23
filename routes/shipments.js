import exportsShipmentsRoute from "./shipments/exportsShipments.js";
import importsShipmentsRoute from "./shipments/importsShipments.js";

import { Router } from "express";

const shipmentsRoute = Router();

shipmentsRoute.use('/export', exportsShipmentsRoute);
shipmentsRoute.use('/import', importsShipmentsRoute);

export default shipmentsRoute;