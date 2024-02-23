const router = require('express').Router()
const {  formController } = require('../controller')
const {formValidation} = require('../validation')
const validator = require('../middleware/validator')
const { auth } = require('../middleware/auth')

router.post('/', auth, validator(formValidation.formSchema), formController.createForm)
router.get('/', auth, formController.getMyForm)
router.get('/:id', auth, formController.getSingleForm)
router.put('/:id', auth, validator(formValidation.formSchema), formController.updateForm)
router.delete('/:id', auth, formController.deleteForm)
router.post('/submit-form/:formId', auth, formController.submitForm)
router.get('/submit-data/:formId', auth, formController.getFormData)

module.exports = router