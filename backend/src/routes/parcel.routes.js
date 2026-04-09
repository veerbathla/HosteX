import express from "express";
import {
    addParcel,
    collectParcel,
    getParcels,
} from "../controller/parcel.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/parcels:
 *   post:
 *     summary: Add a new parcel
 *     description: Admin adds a parcel for a student
 *     tags: [Parcels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - description
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: 65f1c2a8b9e4f123456789ab
 *               description:
 *                 type: string
 *                 example: Amazon package
 *     responses:
 *       201:
 *         description: Parcel added successfully
 *       500:
 *         description: Server error
 */
router.post("/", addParcel);
/**
 * @swagger
 * /api/parcels/{id}/collect:
 *   put:
 *     summary: Collect a parcel
 *     description: Student collects their parcel
 *     tags: [Parcels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Parcel collected successfully
 *       500:
 *         description: Server error
 */
router.put("/:id/collect", collectParcel);
/**
 * @swagger
 * /api/parcels:
 *   get:
 *     summary: Get all parcels
 *     description: Admin fetches all parcels
 *     tags: [Parcels]
 *     responses:
 *       200:
 *         description: List of parcels
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
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                     example: pending
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
router.get("/", getParcels);

export default router;