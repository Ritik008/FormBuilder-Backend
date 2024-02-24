const { adminController } = require('../controller')
const { auth, authorizeRoles } = require('../middleware/auth')
const router = require('express').Router()

router.post('/login', adminController.login)

router.get('/all-forms', auth, authorizeRoles('admin'), adminController.allForms)

router.get('/submissions/:formId', auth, authorizeRoles('admin'), adminController.getSubmissions)

module.exports = router