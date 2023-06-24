const Joi = require('joi')

const blogValidator = Joi.object({
  title: Joi.string().min(4).required(),
  description: Joi.string().min(10).required(),
  comments: Joi.string(),
  user: Joi.string(),
})

exports.validateBlog = (data) => {
  const { err, value } = blogValidator.validateAsync(data)
  return { err: err, value }
}
