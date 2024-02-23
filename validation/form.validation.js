const Joi = require('joi')

const fieldSchema = Joi.object({
    type: Joi.string().valid('text', 'checkbox', 'radio', 'dropdown'),
    label: Joi.string(),
    placeholder: Joi.string().allow(""),
    options: Joi.array().items(Joi.string())
  });

const formSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    fields: Joi.array().items(fieldSchema)
})
 

module.exports = {
    formSchema
}