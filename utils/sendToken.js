const sendToken = async (user, statusCode, res) => {
  const token = user.generateToken()
  return res.status(statusCode).cookie('token', token).json({
    success: true,
    token,
  })
}

module.exports = sendToken
