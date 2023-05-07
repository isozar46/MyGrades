const Models = require('../models/models');

exports.createDep = async (req, res) => {
    const department = new Models.Department(req.body);
    try {
      const newDep = await department.save();
      res.status(201).json(newDep);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};