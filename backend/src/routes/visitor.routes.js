import express from "express";
import {
    createEntry,
    markExit,
    getVisitors,
} from "../controller/visitor.controller.js";

const router = express.Router();

router.post("/entry", createEntry);
router.put("/exit/:id", markExit);
router.get("/", getVisitors);

export default router;