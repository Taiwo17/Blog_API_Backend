const mongoose = require('mongoose')

async function connectDB() {
  try {
    const database = await mongoose.connect(process.env.DB_ONLINE)
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = connectDB
