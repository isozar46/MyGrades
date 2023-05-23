const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeRole = require('../middlewares/authorizeRole');

// Create a new teacher
router.post('/teachers', authenticateUser, authorizeRole('admin'), teacherController.createTeacher);

module.exports = router;