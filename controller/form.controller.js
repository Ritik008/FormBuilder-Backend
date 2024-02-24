const { createError } = require("../utils/error")
const { FormSubmission, Form } = require("../model")


const createForm = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const form = await Form.create({...req.body, userId})
        res.status(200).json(form)
    }catch(err) {
        next(err)
    }
}

const getMyForm = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const forms = await Form.find({userId})
        res.status(200).json(forms)
    }catch(err) {
        next(err)
    }
}

const getSingleForm = async (req, res, next) => {
    try {
        const id = req.params.id
        const form = await Form.findById(id)
        if(!form) {
            return next(createError(404, 'Form not found'))
        }
        res.status(200).json(form)
    }catch(err) {
        next(err)
    }
}

const submitForm = async (req, res, next) => {
    try {
        const formId = req.params.formId
        const form = await Form.findById(formId)
        if(!form) {
            return next(createError(404, 'Form not found'))
        }
        const formData = await FormSubmission.create({formId: form._id, formData: req.body})
        res.status(200).json(formData)
    }catch(err) {
        next(err)
    }
}

const updateForm = async (req, res, next) => {
    try {
        const id = req.params.id
        const form = await Form.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(form)
    }catch(err) {
        next(err)
    }
}

const deleteForm = async (req, res, next) => {
    try {
        const id = req.params.id
        const form = await Form.findByIdAndDelete(id)
        if(!form) {
            return next(createError(400, 'Form with this id not found'))
        }
        res.status(200).json({message: "Form deleted"})
    }catch(err) {
        next(err)
    }
}

const getFormData = async (req, res, next) => {
    try{
        const formId = req.params.formId
        const formsSubmission = await FormSubmission.find({formId})
        res.status(200).json(formsSubmission)
    }catch(err) {
        next(err)
    }
}

module.exports = {
    submitForm,
    createForm,
    updateForm,
    deleteForm,
    getMyForm,
    getSingleForm,
    getFormData
}