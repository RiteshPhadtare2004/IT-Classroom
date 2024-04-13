const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
    // Get token from request header
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        // Verify token
        const decodedToken = jwt.verify(token, 'your_secret_key');

        // Attach user ID to request object for further use
        req.userId = decodedToken.userId;

        // Call next middleware function
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;
