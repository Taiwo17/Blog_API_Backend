const mongoose = require('mongoose')

async function connectDB() {
  try {
    const database = await mongoose.connect('mongodb://0.0.0.0:27017/blog')
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = connectDB
