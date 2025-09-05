const express = require('express');
const { createWorkshop, getWorkshops, addMaterialToWorkshop, joinWorkshop, getJoinedWorkshops } = require('../controllers/workshopController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getWorkshops);

// Protected routes
router.post('/', auth, adminAuth, createWorkshop);
router.post('/:workshopId/materials', auth, adminAuth, addMaterialToWorkshop);
router.post('/:workshopId/join', auth, joinWorkshop);
router.get('/joined', auth, getJoinedWorkshops);

module.exports = router;