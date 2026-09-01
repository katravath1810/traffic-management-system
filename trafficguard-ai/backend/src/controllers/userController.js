const User = require('../models/User')
const Vehicle = require('../models/Vehicle')
const Challan = require('../models/Challan')
const asyncHandler = require('../utils/asyncHandler')
const mongoose = require('mongoose')

exports.getCurrentUser = asyncHandler(async (req,res)=>{
  const user = await User.findById(req.user._id).select('-password')
  res.json({ success:true, data: { user } })
})

exports.getDashboard = asyncHandler(async (req,res)=>{
  const userId = mongoose.Types.ObjectId(req.user._id)

  const vehicles = await Vehicle.aggregate([
    { $match: { owner: userId } },
    { $lookup: { from: 'challans', localField: '_id', foreignField: 'vehicle', as: 'challans' } },
    { $lookup: { from: 'vehiclehistories', localField: '_id', foreignField: 'vehicle', as: 'history' } },
    { $addFields: { pendingChallans: { $filter: { input: '$challans', as:'c', cond: { $eq:['$$c.status','pending'] } } } } },
    { $project: { challans:0 } }
  ])

  // aggregate stats
  const vehicleCount = vehicles.length
  let pendingChallanCount = 0
  let totalPendingAmount = 0
  let resolvedChallanCount = 0
  vehicles.forEach(v=>{
    pendingChallanCount += (v.pendingChallans || []).length
    totalPendingAmount += (v.pendingChallans || []).reduce((s,c)=>s+(c.amount||0),0)
    resolvedChallanCount += (v.history || []).filter(h=>h.eventType==='challan' && h.status==='resolved').length
  })

  res.json({ success:true, data: { user: req.user, statistics: { vehicleCount, pendingChallanCount, totalPendingAmount, resolvedChallanCount }, vehicles } })
})
