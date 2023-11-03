import { Router } from "express";
import authRoute from "./authRoute.js";
import isAdmin from "../middlewares/isAdmin.js";
import adminRoute from "./adminRoute.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/admin", isAdmin, adminRoute);

export default router;
