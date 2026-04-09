import express from "express";
import { getDashboard } from "../controller/dashboard.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";
const router = express.Router();

//Only Admin can Access
router.get("/", protect, authRole("admin"), getDashboard);

export default router;