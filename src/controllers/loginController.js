const User = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if credentials were provided
        if (!email || !password) {
            return res.status(401).json({ error: 'credentials not provided' });
        }

        // Find the user in the database based on the provided email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the passwords
        const isMatch = await bcrypt.compare(password, user.password);

        // Check if passwords match
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Passwords match, generate and return the JWT token
        const token = generateToken({ userId: user._id, role: user.role });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
