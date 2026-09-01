const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'dev_secret'
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

module.exports = generateToken
