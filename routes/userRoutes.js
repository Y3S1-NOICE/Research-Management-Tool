import express from "express";
import { deleteUser, findUsers, registerUser, updateUser } from "../services/userService.js";

const router = express.Router();

router.get('/', findUsers);
router.post('/', registerUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

export default router;