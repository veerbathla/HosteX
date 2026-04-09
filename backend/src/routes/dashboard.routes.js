import express from "express";
import { getDashboard } from "../controller/dashboard.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";
const router = express.Router();

//Only Admin can Access
/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Fetch hostel-based dashboard data (students, rooms, complaints, admins)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalStudents:
 *                   type: number
 *                   example: 120
 *                 totalRooms:
 *                   type: number
 *                   example: 60
 *                 totalOccupiedRooms:
 *                   type: number
 *                   example: 45
 *                 totalVacantRooms:
 *                   type: number
 *                   example: 15
 *                 totalAdmins:
 *                   type: number
 *                   example: 3
 *                 pendingComplaints:
 *                   type: number
 *                   example: 8
 *       500:
 *         description: Server error
 */
router.get("/", getDashboard);

export default router;