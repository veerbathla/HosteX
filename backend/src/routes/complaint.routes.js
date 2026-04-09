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
/**
 * @swagger
 * /api/complaints:
 *   post:
 *     summary: Create a complaint
 *     description: Student creates a new complaint
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - hostelId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Water leakage
 *               description:
 *                 type: string
 *                 example: Water is leaking in bathroom
 *               hostelId:
 *                 type: string
 *                 example: 65f1c2a8b9e4f123456789ab
 *               roomId:
 *                 type: string
 *                 example: 101
 *     responses:
 *       201:
 *         description: Complaint created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createComplaint);

/**
 * @swagger
 * /api/complaints/my:
 *   get:
 *     summary: Get my complaints
 *     description: Student fetches their own complaints
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's complaints
 *       500:
 *         description: Server error
 */
router.get("/my", getMyComplaints);

// Admin
/**
 * @swagger
 * /api/complaints:
 *   get:
 *     summary: Get all complaints
 *     description: Admin fetches all complaints
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all complaints
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   userId:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.get("/", getAllComplaints);

/**
 * @swagger
 * /api/complaints/{id}:
 *   put:
 *     summary: Update complaint status
 *     description: Admin updates the status of a complaint
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, resolved]
 *                 example: in_progress
 *     responses:
 *       200:
 *         description: Complaint updated successfully
 *       404:
 *         description: Complaint not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, authRole(["admin"]), updateComplaintStatus);

export default router;