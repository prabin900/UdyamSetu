const express = require('express');
const { createMaterial, getMaterials, deleteMaterial, upload } = require('../controllers/materialController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, adminAuth, upload.single('file'), createMaterial);
router.get('/', auth, getMaterials);
router.delete('/:id', auth, deleteMaterial);
router.delete('/:id', auth, adminAuth, deleteMaterial);

module.exports = router;