import { Router } from "express";

//mis imports

import { register } from "../controllers/auth/local/register.js";
import {
  localLoginRules,
  localRegisterRules,
} from "../utils/expressValidatorRules.js";
import login from "../controllers/auth/local/login.js";

const authRoute = Router();

authRoute.post("/register", localRegisterRules, register);
authRoute.post("/login", localLoginRules, login);

export default authRoute;
