const express = require('express');
const router = express.Router();
const specialtyController = require('../controllers/specialtyController');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeRole = require('../middlewares/authorizeRole');

// Create a new specialty
router.post('/specialties', authenticateUser, authorizeRole('admin'), specialtyController.createSpecialty);

module.exports = router;
