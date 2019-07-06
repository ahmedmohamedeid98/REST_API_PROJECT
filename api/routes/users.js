const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const checkAuth = require('../middleware/check-auth')

router.post('/signup', userController.user_sign_in)

router.post('/login', userController.user_login)

router.delete('/:userId',checkAuth, userController.user_delete_account)

module.exports = router

