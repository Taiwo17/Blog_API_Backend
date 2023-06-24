const express = require('express')
const dotenv = require('dotenv').config()
const swaggerUi = require('swagger-ui-express')
const PORT = process.env.LOCAL
const docs = require('./docs')
const cors = require('cors')

const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')

// Instatiating the server
const server = express()

// Instatiating the cors confirguration
const corsOptions = {
  origin: 'http://localhost:4000/',
  optionsSuccessStatus: 200,
}

// Database connection
const connectDB = require('./config/database')

// Handling Uncaught Exception => make sure it's at the top of your file so that it wont ruin the server
// Make use of err.message in the production mode
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.stack}`)
  console.log(`Shutting down due uncaught error`)
  process.exit(1)
})

// Sanitize data
server.use(mongoSanitize())

// Rate Limit for the api

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

// Instancing the Limiter

server.use(limiter)

// Express built-in middleware

server.use(cookieParser()) // Use in setting the cookie parser
server.use(express.json()) // Used in passing json application
server.use(express.urlencoded({ extended: false })) // Passing form
server.use(express.static('public')) // Used in passing static file
server.use(cors(corsOptions)) // Cors Middlewares

// Defining the swagger page
server.use('/docs', swaggerUi.serve, swaggerUi.setup(docs, { explorer: true }))

console.log(`Docs is available at http://localhost:${process.env.LOCAL}/docs`)

// Defining the API routes
const userDetails = require('./routes/auth.route')
const blogDetails = require('./routes/blog.route')

server.get('/', (req, res) => {
  return res.json({
    message: 'You are in the Home page now',
  })
})

// Different routes for the APIs
server.use('/api/v1', userDetails)
server.use('/api/v1', blogDetails)

// Database Connection

connectDB()
  .then(() => console.log(`Database connected`))
  .catch('Error has occured')

const app = server.listen(PORT, () =>
  console.log(`The server is listening on port ${PORT}`)
)

// Handling unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error ${err.message}`)
  console.log(`Shutting down the server due to unhandled rejection`)
  app.close(() => {
    process.exit(1)
  })
})
