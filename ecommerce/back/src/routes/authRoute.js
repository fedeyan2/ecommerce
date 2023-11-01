import { Router } from "express";

//mis imports

import { register } from "../controllers/auth/local/register.js";
import {
  localLoginRules,
  localRegisterRules,
} from "../utils/expressValidatorRules.js";
import login from "../controllers/auth/local/login.js";
import loginStatus from "../controllers/auth/loginStatus.js";
import logout from "../controllers/auth/local/logout.js";
import {
  isNOTAuthenticated,
  mustBeAuthenticated,
} from "../middlewares/authCheck.js";

const authRoute = Router();

authRoute.post("/register", isNOTAuthenticated, localRegisterRules, register);
authRoute.post("/login", isNOTAuthenticated, localLoginRules, login);
authRoute.get("/login_status", loginStatus);
authRoute.get("/logout", mustBeAuthenticated, logout);

export default authRoute;
