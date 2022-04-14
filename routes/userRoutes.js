import express from "express";
import { createUser } from "../services/userService.js";

const router = express.Router();

router.post('/', createUser);

export default router;