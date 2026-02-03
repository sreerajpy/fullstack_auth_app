const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')
router.get(`/`, user.getUsers)
router.get(`/:id`, user.getUserById)
router.post(`/:id`, user.updateUser)
router.delete(`/:id`, user.deleteUser)



module.exports = router;