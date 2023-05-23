const bcrypt = require('bcryptjs');
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const Specialty = require('../models/specialtyModel');

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(student.password, 10);

    // Create the user object with the hashed password
    student.password = hashedPassword;

    // Save the student in the database
    const newStudent = await student.save();

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const { role, userId } = req.user;
    const { studentId } = req.query;

    if (role === 'student') {
      // If the user is a student, return only their own student information
      const student = await Student.findById(userId);
      return res.status(200).json([student]);
    }

    let filter = {};

    if (role === 'teacher') {
      // If the user is a teacher, filter students by courses taught by the teacher
      const teacher = await Teacher.findById(userId);
      const courseIds = teacher.courses.map(course => course.course);

      // Get the list of specialties that reference the courses taught by the teacher
      const specialties = await Specialty.find({ 'courses.course': { $in: courseIds } });

      filter = { 'specialty': { $in: specialties } };
    }

    /* not working _ needs a fix */
    if (role === 'department_head') {
      // If the user is a department head, filter students by department
      const department = await Models.Department.findById(userId);
      filter = { 'specialty.department': department.department };
    }

    if (role === 'admin') {
      // If the user is an admin, return all students
      filter = {};
    }

    // Apply additional filtering criteria
    if (studentId) {
      filter._id = studentId;
    }

    const students = await Student.find(filter)
    return res.status(200).json(students);
  } catch (error) {
    //return res.status(500).json({ error: 'Internal server error' });
    return res.status(500).json({ error: error.message });
  }
}