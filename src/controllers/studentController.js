const Student = require('../models/studentModel');

exports.createStudent = async (req, res) => {
    const student = new Student(req.body);
    try {
      const newStudent = await student.save();
      /*if (user.role === "student") {
        const student = new Models.Student({user: user.id});
        const newStudent = await student.save();
      }*/
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};