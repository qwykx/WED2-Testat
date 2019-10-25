import express from 'express';
const router = express.Router();
import {noteController} from '../controllers/noteController.js';

router.post('/', function(req, res) {
    noteController.setSessionParameters(req.session, req.body);
    noteController.all(req, res);
});

router.get('/', function(req, res) {
    noteController.setSessionParameters(req.session, req.body);
    noteController.all(req, res);
});


router.get("/new", noteController.showCreate.bind(noteController));
router.post("/new", noteController.createNote.bind(noteController));
router.get("/edit/:id/", noteController.editNote.bind(noteController));
router.post("/edit/:id/", noteController.updateNote.bind(noteController));
router.post("/delete/:id/", noteController.deleteNote.bind(noteController));

export const noteRoutes = router;
