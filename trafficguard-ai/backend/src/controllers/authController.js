const User = require('../models/User')
const asyncHandler = require('../utils/asyncHandler')
const generateToken = require('../utils/generateToken')

exports.register = asyncHandler(async (req,res)=>{
  const { name, username, email, password, phone } = req.body
  if(!name||!username||!email||!password) return res.status(400).json({ success:false, message:'Missing fields' })
  const exists = await User.findOne({ $or:[{username},{email}] })
  if(exists) return res.status(409).json({ success:false, message:'User or email already exists' })
  const user = await User.create({ name, username, email, password, phone })
  const token = generateToken({ userId: user._id })
  res.cookie('token', token, { httpOnly:true, sameSite:'lax', secure: process.env.NODE_ENV==='production' })
  res.status(201).json({ success:true, data: { user: user.toJSON(), token } })
})

exports.login = asyncHandler(async (req,res)=>{
  const { loginType } = req.body
  if(loginType === 'username'){
    const { username, password } = req.body
    if(!username||!password) return res.status(400).json({ success:false, message:'Missing credentials' })
    const user = await User.findOne({ username: username.toLowerCase() })
    if(!user) return res.status(401).json({ success:false, message:'Invalid credentials' })
    const match = await user.matchPassword(password)
    if(!match) return res.status(401).json({ success:false, message:'Invalid credentials' })
    const token = generateToken({ userId: user._id })
    res.cookie('token', token, { httpOnly:true, sameSite:'lax', secure: process.env.NODE_ENV==='production' })
    return res.json({ success:true, data: { user: user.toJSON(), token } })
  }
  // vehicle login is handled on frontend via public lookup; backend will not create session for vehicle-only lookup here
  return res.status(400).json({ success:false, message:'Unsupported login type' })
})

exports.logout = asyncHandler(async (req,res)=>{
  res.clearCookie('token')
  res.json({ success:true, message:'Logged out' })
})

exports.me = asyncHandler(async (req,res)=>{
  const user = await User.findById(req.user._id).select('-password').populate('vehiclesOwned')
  res.json({ success:true, data: { user } })
})
