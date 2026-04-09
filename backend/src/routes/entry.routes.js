import express from "express";
import {
    studentEntry,
    studentExit,
    getLogs,
} from "../controller/entry.controller.js";

const router = express.Router();

router.post("/entry", studentEntry);
router.post("/exit", studentExit);
router.get("/", getLogs);

export default router;