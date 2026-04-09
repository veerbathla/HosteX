import express from "express";
import {
    createEntry,
    markExit,
    getVisitors,
} from "../controller/visitor.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/visitors/entry:
 *   post:
 *     summary: Record visitor entry
 *     description: Student records a visitor entering the hostel
 *     tags: [Visitors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - purpose
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rajesh Kumar
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *               purpose:
 *                 type: string
 *                 example: Meeting
 *     responses:
 *       201:
 *         description: Visitor entry recorded successfully
 *       500:
 *         description: Server error
 */
router.post("/entry", createEntry);
/**
 * @swagger
 * /api/visitors/exit/{id}:
 *   put:
 *     summary: Record visitor exit
 *     description: Admin records a visitor exiting the hostel
 *     tags: [Visitors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visitor exit recorded successfully
 *       500:
 *         description: Server error
 */
router.put("/exit/:id", markExit);
/**
 * @swagger
 * /api/visitors:
 *   get:
 *     summary: Get all visitors
 *     description: Admin fetches all visitor records
 *     tags: [Visitors]
 *     responses:
 *       200:
 *         description: List of visitors
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
 *                   phone:
 *                     type: string
 *                   purpose:
 *                     type: string
 *                   entryTime:
 *                     type: string
 *                     format: date-time
 *                   exitTime:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                   hostelId:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", getVisitors);

export default router;