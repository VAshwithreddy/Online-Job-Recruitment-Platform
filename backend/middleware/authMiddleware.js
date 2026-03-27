const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/response');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Not authorized to access this route', 401);
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return sendError(res, 'User not found', 401);
    }

    req.user = user;

    next();

  } catch (error) {
    return sendError(res, 'Not authorized to access this route', 401);
  }
};


// Middleware to restrict access to roles
const authorize = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        `User role ${req.user.role} is not authorized to access this route`,
        403
      );
    }

    next();
  };
};

module.exports = { protect, authorize };