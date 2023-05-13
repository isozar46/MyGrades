const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Create a new user
router.post('/students', studentController.createStudent);

module.exports = router;
