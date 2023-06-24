const jwt = require('jsonwebtoken')
const User = require('../models/auth.model')
const errorHandler = require('../utils/errorHandler')

const isAuthenticatedUser = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return errorHandler(
      res,
      { message: 'Not an authorized user, login first' },
      401
    )
  }

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
  req.user = await User.findById(decoded.id)
  next()
}

const authorizeRoles = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        errorHandler(
          res,
          {
            message: `You are not permitted to access this role ${req.role.user}`,
          },
          401
        )
      )
    }
    next()
  }
}

module.exports = { isAuthenticatedUser, authorizeRoles }
