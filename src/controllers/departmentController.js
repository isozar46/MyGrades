const Department = require('../models/departmentModel');
const complaint = require('../models/complaintModel');
const grade = require('../models/gradeModel');
const specialty = require('../models/specialtyModel');
const teacher = require('../models/teacherModel');

exports.createDep = async (req, res) => {
    const department = new Department(req.body);
    try {
      const newDep = await department.save();
      res.status(201).json(newDep);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};