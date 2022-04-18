import express from "express";
import { createPanel, getAllPanels, updatePanel, deletePanel } from "../services/panelService.js";

const router = express.Router();

router.post('/', createPanel);
router.get('/', getAllPanels);
router.put('/:id', updatePanel);
router.delete('/:id', deletePanel);

export default router;