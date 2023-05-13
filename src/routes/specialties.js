const express = require('express');
const router = express.Router();
const specialtyController = require('../controllers/specialtyController');

// Create a new department
router.post('/specialties', specialtyController.createSpecialty);

module.exports = router;
