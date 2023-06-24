const Blog = require('../models/blog.model')
const errorHandler = require('../utils/errorHandler')
const { validateBlog } = require('../validators/blog.validator')

exports.createBlog = async (req, res, next) => {
  const { err } = validateBlog(req.body)
  if (err) return errorHandler(res, { message: 'Error has occured' }, 404)
  const { title, description, comments } = req.body

  const blog = await Blog.create({
    title,
    description,
    comments,
    user: req.user._id,
  })

  return res.status(200).json({
    success: true,
    data: blog,
  })
}

// Displaying all the blog post
exports.findAll = async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user')
  if (!blogs) return errorHandler(res, { message: 'Error has occured' }, 404)
  return res.status(200).json({
    success: true,
    result: blogs.length,
    data: blogs,
  })
}

// Displaying a specific Blog post

exports.singlePost = async (req, res, next) => {
  const { id } = req.params
  const blogs = await Blog.findOne({ _id: id })
  if (!blogs) return errorHandler(res, { message: 'Post not  found' }, 404)

  return res.status(200).json({
    success: true,
    data: blogs,
  })
}

// Updating the blog post
exports.updateBlog = async (req, res, next) => {
  // Request the id from the request body
  const { id } = req.params
  // updating the params
  let blogs = await Blog.findOne({ _id: id })
  if (!blogs)
    return errorHandler(
      res,
      { message: `User(${id}) not in the database` },
      404
    )
  // Checking if the user is the owner of the blog
  // so that nobody can edit it
  if (blogs.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return errorHandler(
      res,
      {
        message: `User(${req.user.role}) is not permitted to edit this blog posts`,
      },
      404
    )
  }
  // console.log(blogs.user) // 873a790c-3a83-41eb-9b00-a052af659409
  // console.log(req.user.id) // 873a790c-3a83-41eb-9b00-a052af659409

  // Updating the blog
  const options = {
    new: true,
    runValidators: true,
  }
  blogs = await Blog.findOneAndUpdate({ _id: id }, req.body, options)
  return res.status(200).json({
    success: true,
    message: 'Blog has been updated',
    data: blogs,
  })
}

exports.deleteBlog = async (req, res, next) => {
  // Requesting the param from the url
  const { id } = req.params
  let blogs = await Blog.findOne({ _id: id })

  if (
    blogs.user !== req.user.id &&
    (req.user.role !== 'author' ||
      req.user.role !== 'contributor' ||
      req.user.role !== 'admin')
  ) {
    return errorHandler(
      res,
      {
        message: `User(${req.user.role}) is not permitted to delete this blog posts`,
      },
      404
    )
  }

  const options = {
    new: true,
    runValidators: true,
  }
  blogs = await Blog.findOneAndDelete({ _id: id }, options) // Matching the req.params id to
  return res.status(200).json({
    success: true,
    message: 'Post has been deleted',
  })
}
