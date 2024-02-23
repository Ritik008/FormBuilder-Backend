const mongoose = require('mongoose')

const FormSubmission = new mongoose.Schema({
    formId: {
        type: mongoose.Types.ObjectId,
        ref: 'Form'
    },
    formData: {
        type: mongoose.Schema.Types.Mixed,
    }
})

module.exports = mongoose.model('formSubmission', FormSubmission)