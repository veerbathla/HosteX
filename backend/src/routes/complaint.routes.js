import express from "express";
import {
    createComplaint,
    getAllComplaints,
    getMyComplaints,
    updateComplaintStatus,
} from "../controller/complaint.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";

const router = express.Router();

// Student
router.post("/", protect, createComplaint);
router.get("/my", protect, getMyComplaints);

// Admin
router.get("/", protect, authRole(["admin"]), getAllComplaints);
router.put("/:id", protect, authRole(["admin"]), updateComplaintStatus);

export default router;