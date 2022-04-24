import express from "express";
import { authorize } from "../middleware/auth.js";
import { createChatGroup, getAllChatGroups, getChatGroup, updateChatGroupDetails, deleteChatGroup } from "../services/chatGroupService.js";
import { roles } from "../utils/utilities.js";
const { STUDENT, ADMIN, PANEL_MEMBER, SUPERVISOR, GROUP_LEADER } = roles;

const router = express.Router();

router.post('/', authorize(ADMIN, GROUP_LEADER, SUPERVISOR), createChatGroup);
router.get('/', authorize(ADMIN, SUPERVISOR), getAllChatGroups);
router.get('/', authorize(ADMIN, STUDENT, SUPERVISOR, PANEL_MEMBER, GROUP_LEADER), getChatGroup);
router.put('/:id', authorize(ADMIN, GROUP_LEADER, PANEL_MEMBER, SUPERVISOR), updateChatGroupDetails);
router.delete('/:id', authorize(ADMIN, GROUP_LEADER, SUPERVISOR), deleteChatGroup);

export default router;