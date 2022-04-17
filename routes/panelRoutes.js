import express from "express";
import { createPanel } from "../services/panelService.js";

const router = express.Router();

router.post('/createPanel', createPanel);

export default router;