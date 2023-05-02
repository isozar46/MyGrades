const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Create a new course
router.post('/courses', courseController.createCourse);

module.exports = router;
