import express from "express";
import { fetchAllStudentGroups, registerStudentGroup } from "../services/studentGroupService.js";

const router = express.Router();

router.post('/', registerStudentGroup);
router.get('/', fetchAllStudentGroups);

export default router;