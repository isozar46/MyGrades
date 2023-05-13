const Specialty = require('../models/specialtyModel');

exports.createSpecialty = async (req, res) => {
    const specialty = new Specialty(req.body);
    try {
      const newSpecialty = await specialty.save();
      res.status(201).json(newSpecialty);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
