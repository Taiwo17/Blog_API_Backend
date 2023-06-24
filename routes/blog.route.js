const express = require('express')
const router = express.Router()

const {
  createBlog,
  updateBlog,
  findAll,
  deleteBlog,
  singlePost,
} = require('../controllers/blog.controller')
const {
  authorizeRoles,
  isAuthenticatedUser,
} = require('../middleware/auth.jwt')

// Defining the routes

router.get('/posts', isAuthenticatedUser, findAll)
router.get('/single-post/:id', isAuthenticatedUser, singlePost)

router.post(
  '/createpost',
  isAuthenticatedUser,
  authorizeRoles('author', 'contributor'),
  createBlog
)
router.put(
  '/edit/:id',
  isAuthenticatedUser,
  authorizeRoles('author', 'contributor'),
  updateBlog
)

router.delete(
  '/delete/:id',
  isAuthenticatedUser,
  authorizeRoles('author', 'contributor'),
  deleteBlog
)

module.exports = router
