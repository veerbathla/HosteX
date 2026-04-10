import express from "express";
import { createHostel, getHostels } from "../controller/hostel.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";
const router = express.Router();

/**
 * @swagger
 * /api/hostels:
 *   post:
 *     summary: Create a hostel
 *     description: Super admin creates a new hostel
 *     tags: [Hostels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: Boys Hostel A
 *               location:
 *                 type: string
 *                 example: Delhi
 *               capacity:
 *                 type: number
 *                 example: 200
 *     responses:
 *       201:
 *         description: Hostel created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 capacity:
 *                   type: number
 *       500:
 *         description: Server error
 */
router.post("/", protect, authRole("super_admin"), createHostel);
/**
 * @swagger
 * /api/hostels:
 *   get:
 *     summary: Get all hostels
 *     description: Fetch list of all hostels
 *     tags: [Hostels]
 *     responses:
 *       200:
 *         description: List of hostels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 *                   capacity:
 *                     type: number
 *       500:
 *         description: Server error
 */
router.get("/", getHostels);

export default router;
