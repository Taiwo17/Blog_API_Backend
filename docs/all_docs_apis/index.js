const createUser = require('./users_docs/create.user')
const loginUser = require('./users_docs/login.user')
const myProfile = require('./users_docs/myprofile')
const createBlog = require('./blog_posts/create.blog')
const fetchAllPosts = require('./blog_posts/findall.blog')
const singlePost = require('./blog_posts/single.blog')
const editPost = require('./blog_posts/edit.blog')
const deletePost = require('./blog_posts/delete.blog')

module.exports = {
  paths: {
    '/signup': {
      ...createUser,
    },
    '/login': {
      ...loginUser,
    },
    '/profile': {
      ...myProfile,
    },
    '/createpost': {
      ...createBlog,
    },
    '/posts': {
      ...fetchAllPosts,
    },
    '/single-post/{id}': {
      ...singlePost,
    },
    '/edit/{id}': {
      ...editPost,
    },
    '/delete/{id}': {
      ...deletePost,
    },
  },
}
