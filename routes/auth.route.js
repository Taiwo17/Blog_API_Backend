const express = require('express')
const router = express.Router()

const {
  userSignup,
  userLogin,
  myProfile,
} = require('../controllers/auth.controller')
const { isAuthenticatedUser } = require('../middleware/auth.jwt')

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.get('/profile', isAuthenticatedUser, myProfile)

module.exports = router
