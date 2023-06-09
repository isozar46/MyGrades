const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    const user = new User(req.body);
    try {
      const newUser = await user.save();
      /*if (user.role === "student") {
        const student = new Models.Student({user: user.id});
        const newStudent = await student.save();
      }*/
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};