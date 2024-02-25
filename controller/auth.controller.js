// Import necessary modules and models
const { createError } = require('../utils/error')
const { User } = require('../model')
const jwt = require('jsonwebtoken')

// Middleware function for user registration
const register = async (req, res, next) => {
  // Extract fullName, email, and password from request body
  const { fullName, email, password } = req.body
  try {
    // Check if all required fields are provided
    if (!fullName || !email || !password) {
      return next(createError(400, 'All fields are required'))
    }
    // Check if email already exists in the database
    if (await User.doesEmailAlreadyExists(email)) {
      return next(createError(422, 'Email already exists'))
    }
    // Create a new user
    const user = await User.create({ fullName, email, password })
    // Send success response with user details
    res.status(200).json({ fullName: user.fullName, email: user.email })
  } catch (err) {
    // Forward errors to error handling middleware
    next(err)
  }
}

// Middleware function for user login
const login = async (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body
  try {
    // Check if email or password is missing
    if (!email || !password) {
      return next(createError(400, "Email or password is required"))
    }
    // Find user by email
    const user = await User.findOne({ email })
    // Check if user exists
    if (!user) {
      return next(createError(404, 'User email does not exist'))
    }
    // Check if user is not a regular user
    if (user.role !== 'user') {
      return next(createError(400, 'User not found'))
    }
    // Check if password matches
    if (!(await user.doesPasswordMatches(password))) {
      return next(createError(401, 'Bad Credentials'))
    }
    // Create payload for JWT token
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    // Sign JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    // Send token in response
    res.status(200).json({ token });
  } catch (err) {
    // Forward errors to error handling middleware
    next(err);
  }
};

// Export middleware functions
module.exports = {
  login,
  register
};
