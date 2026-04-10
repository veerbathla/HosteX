import express from "express";
import {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    updateLeaveStatus,
} from "../controller/leave.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/leaves:
 *   post:
 *     summary: Apply for leave (Student/Staff)
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fromDate: "2026-04-10"
 *             toDate: "2026-04-15"
 *             reason: "Going home"
 *             hostelId: "661234abcd1234abcd5678ef"
 *     responses:
 *       201:
 *         description: Leave applied successfully
 *       500:
 *         description: Server error
 */
router.post("/", protect, applyLeave);

/**
 * @swagger
 * /api/leaves/my:
 *   get:
 *     summary: Get logged-in user's leaves
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's leaves
 *       500:
 *         description: Server error
 */
router.get("/my", protect, getMyLeaves);

/**
 * @swagger
 * /api/leaves:
 *   get:
 *     summary: Get all leave requests (Admin)
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all leave requests
 *       500:
 *         description: Server error
 */
router.get("/", protect, authRole("admin", "super_admin"), getAllLeaves);

/**
 * @swagger
 * /api/leaves/{id}:
 *   put:
 *     summary: Approve or Reject leave (Admin)
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Leave ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: "approved"
 *     responses:
 *       200:
 *         description: Leave status updated
 *       404:
 *         description: Leave not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, authRole("admin", "super_admin"), updateLeaveStatus);

export default router;
