import express from "express";
import { createUser, getUsers } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a user
 *     description: Admin adds a new student/user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: student
 *               hostelId:
 *                 type: string
 *                 example: 65f1c2a8b9e4f123456789ab
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createUser);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Admin fetches all users of hostel
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
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
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   hostelId:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", protect, authRole("admin"), getUsers);

export default router;