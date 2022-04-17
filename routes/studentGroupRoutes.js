import express from "express";
import { fetchAllStudentGroups, registerStudentGroup, requestSupervisor, requestCoSupervisor} from "../services/studentGroupService.js";

const router = express.Router();

router.post('/', registerStudentGroup);
router.get('/', fetchAllStudentGroups);
router.put('/supervisor/:id', requestSupervisor);
router.put('/cosupervisor/:id', requestCoSupervisor);

export default router;