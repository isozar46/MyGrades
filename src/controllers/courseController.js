const Course = require('../models/courseModel');
const Student = require('../models/studentModel');
const Specialty = require('../models/specialtyModel');

exports.createCourse = async (req, res) => {
  const course = new Course(req.body);
  try {
    const newCourse = await course.save();
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    if (req.user.role === "student") {
      // Find the student by ID and populate the specialty field
      const student = await Student.findById(req.user.userId).populate({
        path: 'specialty',
        populate: {
          path: 'courses',
          populate: {
            path: 'course',
            //select: 'code -_id'
          }
        }
      });

      // Handle case when student's specialty is not found
      if (!student.specialty) {
        return res.status(404).json({ error: 'Student specialty not found' });
      }

      // Access the list of courses from the populated specialty
      const courses = student.specialty.courses;

      return res.status(200).json(courses);
    }

    if (req.user.role === "admin") {
      const { specialtyCode } = req.query;

      if (specialtyCode) {
        // If specialtyCode is provided, filter courses by the specialty
        const specialty = await Specialty.findOne({ code: specialtyCode }).populate({
          path: 'courses',
          populate: {
            path: 'course',
            //select: 'code -_id'
          }

        });

        // Handle case when a student has not been assgined a specialty yet
        if (!specialty) {
          return res.status(404).json({ error: 'Specialty not found' });
        }

        // Access the list of courses from the populated specialty
        const courses = specialty.courses;

        return res.json(courses);
      } else {
        // If no specialtyCode provided, return all courses
        const courses = await Course.find();
        return res.json(courses);
      }
    }
    //const courses = await Course.find();
    //res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
