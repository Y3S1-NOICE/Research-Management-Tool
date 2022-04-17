import express from "express";
import { registerStudentGroup } from "../services/studentGroupService.js";

const router = express.Router();

router.post('/', registerStudentGroup);

export default router;