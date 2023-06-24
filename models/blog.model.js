const mongoose = require('mongoose')
const { v4 } = require('uuid')

const { Schema, model } = mongoose

const blogSchema = Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    title: {
      type: String,
      minLength: [4, 'Please write minimum of 20 Character'],
      required: true,
    },
    description: {
      type: String,
      minLength: [10, 'Please write minimum of 60 Character'],
      required: true,
    },
    comments: {
      type: String,
    },
    user: {
      type: String,
      ref: 'User',
    },
  },

  {
    timestamps: true,
  }
)

// console.log(blogSchema.path('users').ref('User'))

const Blog = model('Blog', blogSchema)

module.exports = Blog
