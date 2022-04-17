import express from "express";
import { createPanel, getAllPanels, updatePanel } from "../services/panelService.js";

const router = express.Router();

router.post('/', createPanel);
router.get('/', getAllPanels);
router.put('/:id', updatePanel);

export default router;