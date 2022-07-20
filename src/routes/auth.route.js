const { Router } = require('express')
const AuthController = require('../controllers/auth.controller')
const authValidation = require('../validation/auth.validation')
const validate = require('../middlewares/validate')
const verifyToken = require('../middlewares/verifyToken')
const router = Router()

router.route('/register').post(validate(authValidation.register), AuthController.register)
router.route('/login').post(validate(authValidation.login), AuthController.login)
router.route('/logout').post(AuthController.logout)
router.route('/').get(verifyToken, AuthController.getUser)

module.exports = router
