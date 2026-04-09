import express from "express";
import { createUser, getUsers } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";
const router = express.Router();

router.post("/", protect, authRole("admin"), createUser);
router.get("/", protect, authRole("admin"), getUsers);

export default router;