const express = require('express');
const { generateCertificate, getUserCertificates } = require('../controllers/certificateController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/generate/:workshopId', auth, generateCertificate);
router.get('/my-certificates', auth, getUserCertificates);

module.exports = router;