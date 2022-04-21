import express from "express";
import { authorize } from "../middleware/auth.js";
import { deleteUser, findUsers, registerUser, updateUser } from "../services/userService.js";
import { roles } from "../utils/utilities.js";
const {SUPERVISOR, STUDENT, PANEL_MEMBER, ADMIN} = roles;

const router = express.Router();

router.get('/', authorize(STUDENT, ADMIN, PANEL_MEMBER, SUPERVISOR),  findUsers);
router.post('/', authorize(SUPERVISOR, STUDENT, PANEL_MEMBER), registerUser);
router.put('/', authorize(ADMIN), updateUser);
router.delete('/', authorize(ADMIN), deleteUser);

export default router;