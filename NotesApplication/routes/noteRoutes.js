const express = require('express');
const router = express.Router();
const Controller = require('../controllers/NoteController');

router.get("/", Controller.index);
router.get("/create", Controller.showCreate);

module.exports = router;
