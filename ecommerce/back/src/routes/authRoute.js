import { Router } from "express";

//mis imports

import { register } from "../controllers/auth/local/register.js";
import {
  localLoginRules,
  localRegisterRules,
} from "../utils/expressValidatorRules.js";
import login from "../controllers/auth/local/login.js";
import loginStatus from "../controllers/auth/loginStatus.js";

const authRoute = Router();

authRoute.post("/register", localRegisterRules, register);
authRoute.post("/login", localLoginRules, login);
authRoute.get("/login_status", loginStatus);

export default authRoute;
