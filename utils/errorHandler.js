const errorHandler = (res, err, statusCode) => {
  console.log(res, err, statusCode)
  return res.status(statusCode).json({
    message: err.message,
  })
}

module.exports = errorHandler
