import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from "../services/chatService.js";
import { authorize } from "../middleware/auth.js";
import { roles } from "../utils/utilities.js";

const { STUDENT, ADMIN } = roles;
const router = express.Router();

// router.post('/', authorize(ADMIN), accessChat);
// router.get('/', authorize(ADMIN), fetchChats);
// router.post('/group', authorize(ADMIN), createGroupChat);
// router.put('/rename', authorize(ADMIN), renameGroup);
// router.put('/groupremove', authorize(ADMIN), removeFromGroup);
// router.put('/groupadd', authorize(ADMIN), addToGroup);

router.route("/").post(accessChat);
router.route("/").get(fetchChats);
router.route("/group").post(createGroupChat);
router.route("/rename").put(renameGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/groupadd").put(addToGroup);

export default router;