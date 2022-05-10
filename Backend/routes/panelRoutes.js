import express from "express";
import { createPanel, getAllPanels, updatePanel, deletePanel, getPanel } from "../services/panelService.js";
import { authorize } from "../middleware/auth.js";
import { roles } from "../utils/utilities.js";

const { ADMIN, PANEL_MEMBER } = roles;

const router = express.Router();

router.post('/', authorize(ADMIN), createPanel);
router.get('/',getAllPanels);
router.get('/details', authorize(PANEL_MEMBER), getPanel);
router.put('/:id', authorize(ADMIN), updatePanel);
router.delete('/:id', authorize(ADMIN), deletePanel);

export default router;