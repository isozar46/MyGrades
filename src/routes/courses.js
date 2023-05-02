const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Create a new course
router.post('/courses', courseController.createCourse);

// Get all courses
router.get('/courses', courseController.getAllCourses);

module.exports = router;
