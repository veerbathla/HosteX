// routes/gatekeeper.routes.js

import express from "express";
import { getGatekeeperDashboard } from "../controller/gatekeeper.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";

const router = express.Router();

// Gatekeeper Dashboard
router.get(
    "/dashboard",
    protect,
    authRole("admin"), // ya "gatekeeper" agar role add kare
    getGatekeeperDashboard
);

export default router;