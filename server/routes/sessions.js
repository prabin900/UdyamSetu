const express = require('express');
const { createSession, getSessions } = require('../controllers/sessionController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, adminAuth, createSession);
router.get('/', auth, getSessions);

module.exports = router;