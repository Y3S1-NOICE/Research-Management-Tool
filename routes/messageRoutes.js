import express from "express";
import {
  allMessages,
  sendMessage,
} from "../services/messageService.js";
import { authorize } from "../middleware/auth.js";
import { roles } from "../utils/utilities.js";


const { STUDENT, ADMIN } = roles;
const router = express.Router();

router.route("/:chatId").get(allMessages);
router.route("/").post(sendMessage);

export default router;