const User = require('../models/auth.model')
const errorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/sendToken')
const {
  validateUserSignUp,
  validateUserLogin,
} = require('../validators/auth.validator')

const userSignup = async (req, res, next) => {
  const { err } = validateUserSignUp(req.body)
  if (err) return errorHandler(res, err, 400)
  try {
    const usersExist = await User.findOne({
      $or: [
        {
          email: {
            $eq: req.body.email,
          },
        },
        {
          password: {
            $eq: req.body.password,
          },
        },
      ],
    })
    if (usersExist) return errorHandler(res, { message: 'User exist' }, 400)
    const users = await User.create(req.body)
    if (!users)
      return errorHandler(res, { message: 'Unable to create User' }, 400)
    sendToken(users, 200, res) // Sending token to client after successful login
  } catch (error) {
    console.log(error.message)
    return errorHandler(res, { message: 'Error has occured' }, 400)
  }
}

const userLogin = async (req, res, next) => {
  const { err } = validateUserLogin(req.body) // Validating the request body
  if (err) return errorHandler(res, { message: 'Error has occured' }, 400) // Returning an Error if it occurs
  try {
    const { email } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user) return errorHandler(res, { message: 'User does not exist' }, 400)
    // comparing the password with that of the database
    const isPasswordMatch = user.comparePassword(req.body.password)
    if (!isPasswordMatch)
      return errorHandler(res, { message: `Password doesn't match` }, 401) // If passwords don't match then throw a bad Request error

    sendToken(user, 200, res) // Sending token to client after successful login
  } catch (error) {
    console.log(error.message)
  }
}

const myProfile = async (req, res, next) => {
  const users = await User.findOne({}).select('-__v -createdAt -updatedAt')
  return res.status(200).json({
    success: true,
    data: users,
  })
}

module.exports = { userSignup, userLogin, myProfile }
