// Import necessary modules and models
const { User, Form, FormSubmission } = require("../model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createError } = require("../utils/error")

// Middleware function for user login
const login = async (req, res, next) => {
    try {
        // Extract email and password from request body
        const {email, password} = req.body

        // Check if email or password is missing
        if(!email || !password) {
            return next(createError(400, 'Email or password is required'))
        }

        // Find user by email
        const user = await User.findOne({email})

        // Check if user exists
        if(!user) {
            return next(createError(400, 'User with this email not found'))
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password)

        // Check if passwords match
        if(!match) {
            return next(createError(400, 'Bad Credentials'))
        }

        // Check if user is not an admin
        if(user.role !== 'admin') {
            return next(createError(401, 'Unauthorized User'))
        }

        // Create payload for JWT token
        const payload = {
            userId: user._id,
            email: user.email,
            role: user.role
        }

        // Sign JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        // Send token in response
        res.status(200).json({token})

    } catch(err) {
        // Forward errors to error handling middleware
        next(err)
    }
}

// Middleware function to get all forms
const allForms = async (req, res, next) => {
    try {
        // Find all forms and sort by createdAt field in descending order
        const form = await Form.find({}).sort({createdAt: -1})
        
        // Send forms in response
        res.status(200).json(form)
    } catch(err) {
        // Forward errors to error handling middleware
        next(err)
    }
}

// Middleware function to get form submissions
const getSubmissions = async (req, res, next) => {
    try {
        // Extract formId from request parameters
        const formId = req.params.formId
        
        // Find form submissions by formId
        const form = await FormSubmission.find({formId})
        
        // Send form submissions in response
        res.status(200).json(form)
    } catch(err) {
        // Forward errors to error handling middleware
        next(err)
    }
}

// Export middleware functions
module.exports = {
    login,
    allForms,
    getSubmissions
}
