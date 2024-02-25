// Import necessary modules and models
const { createError } = require("../utils/error")
const { FormSubmission, Form } = require("../model")

// Middleware function to create a new form
const createForm = async (req, res, next) => {
    try {
        // Extract userId from authenticated user
        const userId = req.user.userId
        // Create a new form with userId
        const form = await Form.create({...req.body, userId})
        // Send success response with created form
        res.status(200).json(form)
    } catch (err) {
        // Forward errors to error handling middleware
        next(err)
    }
}

// Middleware function to get all forms belonging to the authenticated user
const getMyForm = async (req, res, next) => {
    try {
        // Extract userId from authenticated user
        const userId = req.user.userId
        // Find all forms belonging to the user
        const forms = await Form.find({userId})
        // Send success response with forms
        res.status(200).json(forms)
    } catch (err) {
        // Forward errors to error handling middleware
        next(err)
    }
}

// Middleware function to get a single form by its ID
const getSingleForm = async (req, res, next) => {
    try {
        // Extract form ID from request parameters
        const id = req.params.id
        // Find form by ID
        const form = await Form.findById(id)
        // If form is not found, return error
        if (!form) {
            return next(createError(404, 'Form not found'))
        }
        // Send success response with the found form
        res.status(200).json(form)
    } catch (err) {
        // Forward errors to error handling middleware
        next(err)
    }
}

// Middleware function to submit form data
const submitForm = async (req, res, next) => {
    try {
        // Extract form ID from request parameters
        const formId = req.params.formId
        // Find form by ID
        const form = await Form.findById(formId)
        // If form is not found, return error
        if (!form) {
            return next(createError(404, 'Form not found'))
        }
        // Create new form submission with form ID and submitted data
        const formData = await FormSubmission.create({formId: form._id, formData: req.body})
        // Send success response with the created form submission
        res.status(200).json(formData)
    } catch (err) {
        // Forward errors to error handling middleware
        next(err)
    }
}

// Middleware function to update a form by its ID
const updateForm = async (req, res, next) => {
    try {
        // Extract form ID from request parameters
        const id = req.params.id
        // Update form by ID with the provided data
        const form = await Form.findByIdAndUpdate(id, req.body, {new: true})
        // Send success response with the updated form
        res.status(200).json(form)
    } catch (err) {
        // Forward errors to error handling middleware
        next(err)
    }
}

// Middleware function to delete a form by its ID
const deleteForm = async (req, res, next) => {
    try {
        // Extract form ID from request parameters
        const id = req.params.id
        // Find and delete form by ID
        const form = await Form.findByIdAndDelete(id)
        // If form is not found, return error
        if (!form) {
            return next(createError(400, 'Form with this id not found'))
        }
        // Send success response
        res.status(200).json({message: "Form deleted"})
    } catch (err) {
        // Forward errors to error handling middleware
        next(err)
    }
}

// Middleware function to get form submissions for a specific form
const getFormData = async (req, res, next) => {
    try {
        // Extract form ID from request parameters
        const formId = req.params.formId
        // Find all form submissions for the specified form ID
        const formsSubmission = await FormSubmission.find({formId})
        // Send success response with form submissions
        res.status(200).json(formsSubmission)
    } catch (err) {
        // Forward errors to error handling middleware
        next(err)
    }
}

// Export middleware functions
module.exports = {
    submitForm,
    createForm,
    updateForm,
    deleteForm,
    getMyForm,
    getSingleForm,
    getFormData
}
