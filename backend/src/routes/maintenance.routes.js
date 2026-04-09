import express from "express";
import { createRequest, getRequests } from "../controller/maintenance.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/maintenance:
 *   post:
 *     summary: Create maintenance request
 *     description: Student raises a maintenance issue
 *     tags: [Maintenance]
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: Fan not working
 *               description:
 *                 type: string
 *                 example: Ceiling fan is not working properly
 *               roomId:
 *                 type: string
 *                 example: 101
 *     responses:
 *       201:
 *         description: Request created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createRequest);
/**
 * @swagger
 * /api/maintenance:
 *   get:
 *     summary: Get maintenance requests
 *     description: Admin fetches all maintenance requests of hostel
 *     tags: [Maintenance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of maintenance requests
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
 *                     example: pending
 *                   studentId:
 *                     type: string
 *                   hostelId:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", getRequests);

export default router;