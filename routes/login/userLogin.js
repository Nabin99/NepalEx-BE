import { Router } from "express";
import { UserCredentials } from "../../controllers/userLoginController.js";

const userLoginRoute = Router();

userLoginRoute.post('/', UserCredentials);

export default userLoginRoute;