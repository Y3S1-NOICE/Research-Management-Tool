import express from "express";
import { authorize } from "../middleware/auth.js";
import { getFilesList, uploadFile, getFile, deleteFile } from "../services/s3Services.js";
import { roles } from "../utils/utilities.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const { STUDENT, PANEL_MEMBER, SUPERVISOR } = roles;

const router = express.Router();

router.put('/',upload.single('file'), authorize(STUDENT), uploadFile);
router.get('/', authorize(PANEL_MEMBER, SUPERVISOR), getFilesList);
router.get('/:folder/:type/:key', authorize(PANEL_MEMBER, SUPERVISOR), getFile);
router.delete('/:folder/:type/:key', authorize(STUDENT), deleteFile);

export default router;