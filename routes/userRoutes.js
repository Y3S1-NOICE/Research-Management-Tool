import express from "express";
import { authorize } from "../middleware/auth.js";
import { deleteUser, findUsers, registerUser, updateUser } from "../services/userService.js";

const router = express.Router();

router.get('/', authorize('Student') ,findUsers);
router.post('/', registerUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

export default router;