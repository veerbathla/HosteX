import express from "express";
import {
    studentEntry,
    studentExit,
    getLogs,
} from "../controller/entry.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/entry/entry:
 *   post:
 *     summary: Student entry
 *     description: Marks student entry (return to hostel)
 *     tags: [Entry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: 65f1c2a8b9e4f123456789ab
 *     responses:
 *       201:
 *         description: Entry marked successfully
 *       500:
 *         description: Server error
 */
router.post("/entry", protect, authRole("admin", "super_admin", "gatekeeper"), studentEntry);
/**
 * @swagger
 * /api/entry/exit:
 *   post:
 *     summary: Student exit
 *     description: Marks student exit from hostel
 *     tags: [Entry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - hostelId
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: 65f1c2a8b9e4f123456789ab
 *               hostelId:
 *                 type: string
 *                 example: 65f1c2a8b9e4f123456789ab
 *     responses:
 *       201:
 *         description: Exit marked successfully
 *       500:
 *         description: Server error
 */
router.post("/exit", protect, authRole("admin", "super_admin", "gatekeeper"), studentExit);
/**
 * @swagger
 * /api/entry:
 *   get:
 *     summary: Get all logs
 *     description: Fetches all entry/exit logs
 *     tags: [Entry]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   studentId:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                   entryTime:
 *                     type: string
 *                     format: date-time
 *                   exitTime:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", protect, authRole("admin", "super_admin", "gatekeeper"), getLogs);

export default router;
