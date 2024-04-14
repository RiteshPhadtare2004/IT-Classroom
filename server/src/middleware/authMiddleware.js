const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    
    const decodedToken = jwt.verify(token, 'your_secret_key');

    const userId = decodedToken.userId;
    // Fetch user from database based on user ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Check if user role is teacher or student
    if (user.role !== 'teacher' && user.role !== 'student') {
      return res.status(403).json({ message: 'Forbidden: Invalid user role' });
    }
    // Attach user object to request for further use
    req.user = user;

    // Call next middleware function
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
module.exports = authMiddleware;
