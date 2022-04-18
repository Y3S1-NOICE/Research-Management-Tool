import express from "express";
import { authorize } from "../middleware/auth.js";
import { fetchAllStudentGroups, registerStudentGroup, requestSupervisor, requestCoSupervisor, allocateOrDeallocatePanels } from "../services/studentGroupService.js";
import { roles } from "../utils/utilities.js";
const { STUDENT, ADMIN } = roles;

const router = express.Router();

router.post('/', authorize(STUDENT), registerStudentGroup);
router.get('/', authorize(ADMIN), fetchAllStudentGroups);
router.put('/:id/supervisors', authorize(STUDENT), requestSupervisor);
router.put('/:id/cosupervisors', authorize(STUDENT), requestCoSupervisor);
router.put('/:id/panels', authorize(ADMIN), allocateOrDeallocatePanels);

export default router;