import express from "express";
import { createRequest ,getRequests } from "../controller/maintenance.controller.js";
import { protect } from "../middleware/auth.middleware.js"; 
import { authRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, authRole("student"), createRequest);
router.get("/", protect, authRole("admin"), getRequests);

export default router;