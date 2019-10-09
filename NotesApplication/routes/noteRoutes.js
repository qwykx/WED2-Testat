import express from 'express';
const router = express.Router();
import {noteController} from '../controllers/noteController.js';

router.get("/", noteController.showIndex.bind(noteController));
router.get("/create", noteController.showCreate.bind(noteController));
router.post("/create", noteController.createNote.bind(noteController));

export const noteRoutes = router;
