import express from "express";
import { handleMouseMove } from "../controller/mouseController.js";

const router = express.Router();

// POST: Mausbewegungen
router.post("/", handleMouseMove);

export default router;
