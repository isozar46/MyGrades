const bcrypt = require('bcryptjs');
const Teacher = require('../models/teacherModel');

exports.createTeacher = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'teacher details not provided' });
        }

        const teacher = new Teacher(req.body);

        // Hash the password
        const hashedPassword = await bcrypt.hash(teacher.password, 10);

        // Create the user object with the hashed password
        teacher.password = hashedPassword;

        // Save the student in the database
        const newTeacher = await teacher.save();

        return res.status(201).json(newTeacher);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
