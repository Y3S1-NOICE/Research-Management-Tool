import express from "express";
import { createPanel, getAllPanels } from "../services/panelService.js";

const router = express.Router();

router.post('/createPanel', createPanel);
router.post('/getAllPanels', getAllPanels);

export default router;