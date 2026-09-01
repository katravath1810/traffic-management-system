const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async (req,res,next) => {
  try{
    let token
    const auth = req.headers.authorization
    if(auth && auth.startsWith('Bearer ')) token = auth.split(' ')[1]
    if(!token && req.cookies && req.cookies.token) token = req.cookies.token
    if(!token) return res.status(401).json({ success:false, message:'Not authorized' })
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    const user = await User.findById(decoded.userId).select('-password')
    if(!user) return res.status(401).json({ success:false, message:'Invalid token' })
    req.user = user
    next()
  }catch(err){
    return res.status(401).json({ success:false, message:'Not authorized', error: err.message })
  }
}

module.exports = authMiddleware
