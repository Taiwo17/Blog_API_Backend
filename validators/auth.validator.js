const Joi = require('joi')

const userSignUp = Joi.object({
  name: Joi.string().min(4).max(60).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$#!%*?&.]{8,40}/
      ),
      {
        name: 'At least one uppercase, one lowercase, one special character, and minimum of 8 and maximum of 40 characters',
      }
    )
    .required(),
  role: Joi.string().valid('user', 'author', 'contributor').required(),
})

const userLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

const validateUserSignUp = (data) => {
  // destructure errror
  const { err, value } = userSignUp.validateAsync(data)
  return { err: err, value }
}

const validateUserLogin = (data) => {
  const { err, value } = userLogin.validateAsync(data)
  return { err: err, value }
}

module.exports = { validateUserSignUp, validateUserLogin }
