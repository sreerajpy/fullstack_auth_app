const express = require(`express`)
const router = express.Router()

const auth = require('../controllers/auth.controller')
const signupValidation = require('../middlewares/signupValidation')
const loginValidation = require('../middlewares/loginValidation')

router.post(`/signup`, signupValidation, auth.signUp)
router.post(`/login`, loginValidation, auth.login)


module.exports = router