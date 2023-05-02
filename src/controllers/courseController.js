const Models = require('../models/models');

exports.createCourse = async (req, res) => {
    const course = new Models.Course(req.body);
    try {
      const newCourse = await course.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
      const courses = await Models.Course.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  