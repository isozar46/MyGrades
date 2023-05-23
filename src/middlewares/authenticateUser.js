const { verifyToken } = require('../utils/jwtUtils');

const authenticateUser = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify and decode the token
        const decoded = verifyToken(token);

        // Set the user ID or any other desired information in the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticateUser;
