const { adminController } = require('../controller')
const { auth, authorizeRoles } = require('../middleware/auth')
const router = require('express').Router()

router.post('/login', adminController.login)

router.get('/all-forms', auth, authorizeRoles('admin'), adminController.allForms)
module.exports = router