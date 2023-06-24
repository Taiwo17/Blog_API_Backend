const mongoose = require('mongoose')
const { v4 } = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    _id: { type: String, default: v4 },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please input your email address'],
    },
    password: {
      type: String,
      required: [true, 'Please input your password'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'author', 'contributor'],
        message: 'Please select your role',
      },
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
)

// Hashing the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const saltRound = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, saltRound)
  next()
})

// Setting the user token for login and signup // Second method
/* function getJwtToken(user) {
  const options = {
    expiresIn: '6h',
    issuer: 'lms-hasher',
  }
  return jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, options)
} */

userSchema.methods.generateToken = function generateToken() {
  const options = {
    expiresIn: '6h',
    issuer: 'lms-hasher',
  }
  return jwt.sign({ id: this._id }, process.env.TOKEN_SECRET, options)
}

// Comparing the password in the database

userSchema.methods.comparePassword = function (enterpassword) {
  return bcrypt.compare(enterpassword, this.password)
}

const User = model('User', userSchema)

module.exports = User
