import express from "express";
import { createRoom, getRooms } from "../controller/room.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";
const router = express.Router();

router.post("/", protect, authRole("admin"), createRoom);
router.get("/", protect, getRooms);

export default router;