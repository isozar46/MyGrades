const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Create a new department
router.post('/departments', departmentController.createDep);

module.exports = router;
