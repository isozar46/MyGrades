const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeRole = require('../middlewares/authorizeRole');

// Show grades
router.get('/grades', authenticateUser, gradeController.getGrades);

// add grades
router.post('/grades', authenticateUser, authorizeRole('teacher'), gradeController.addGrade);

module.exports = router;
