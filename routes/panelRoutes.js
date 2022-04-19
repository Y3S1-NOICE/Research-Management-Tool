import express from "express";
import { createPanel, getAllPanels, updatePanel, deletePanel } from "../services/panelService.js";
import { authorize } from "../middleware/auth.js";
import { roles } from "../utils/utilities.js";

const { STUDENT, ADMIN } = roles;

const router = express.Router();

router.post('/', authorize(ADMIN), createPanel);
router.get('/', getAllPanels);
router.put('/:id', authorize(ADMIN), updatePanel);
router.delete('/:id', authorize(ADMIN), deletePanel);

export default router;