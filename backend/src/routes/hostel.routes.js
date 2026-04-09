import express from "express";
import { createHostel, getHostels } from "../controller/hostel.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";
const router = express.Router();

router.post("/", protect, authRole("super_admin"), createHostel);
router.get("/", protect, getHostels);

export default router;