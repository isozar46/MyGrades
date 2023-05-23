const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeRole = require('../middlewares/authorizeRole');

// Create a new course
router.post('/courses', authenticateUser, authorizeRole('admin'), courseController.createCourse);

// Show courses
router.get('/courses', authenticateUser, courseController.getAllCourses);

module.exports = router;
