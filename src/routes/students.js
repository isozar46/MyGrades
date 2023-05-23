const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeRole = require('../middlewares/authorizeRole');

// Create a new student
router.post('/students', authenticateUser, authorizeRole(['department_head', 'admin']), studentController.createStudent);

// Show students
router.get('/students', authenticateUser, studentController.getStudents);

module.exports = router;
