import express from "express";
import {
    addParcel,
    collectParcel,
    getParcels,
} from "../controller/parcel.controller.js";

const router = express.Router();

router.post("/", addParcel);
router.put("/:id/collect", collectParcel);
router.get("/", getParcels);

export default router;