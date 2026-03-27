const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');

// Helper to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = user.getSignedJwtToken();

  return res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Allow only specific roles
    const allowedRoles = ["jobseeker", "employer"];

    if (role && !allowedRoles.includes(role)) {
      return sendError(res, "Invalid role specified", 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, "User with this email already exists", 409);
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "jobseeker"
    });

    return sendTokenResponse(user, 201, res, "User registered successfully");

  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, "Email and password are required", 400);
    }

    // Include password for comparison
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return sendError(res, "Invalid credentials", 401);
    }

    // Check if account is active
    if (!user.isActive) {
      return sendError(res, "Account is inactive", 403);
    }

    // Compare password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return sendError(res, "Invalid credentials", 401);
    }

    return sendTokenResponse(user, 200, res, "Login successful");

  } catch (error) {
    next(error);
  }
};

// @desc    Get logged-in user profile
// @route   GET /api/auth/me
// @access  Private (requires auth middleware)
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    return sendSuccess(res, user, 'User profile fetched successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };
