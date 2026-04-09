import express from "express";
import { createRoom, getRooms } from "../controller/room.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";
const router = express.Router();

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     description: Admin creates a new room in the hostel
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomNumber
 *               - capacity
 *             properties:
 *               roomNumber:
 *                 type: string
 *                 example: 101
 *               capacity:
 *                 type: number
 *                 example: 4
 *     responses:
 *       201:
 *         description: Room created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createRoom);
/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     description: Admin fetches all rooms in the hostel
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   roomNumber:
 *                     type: string
 *                   capacity:
 *                     type: number
 *                   hostelId:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", getRooms);

export default router;