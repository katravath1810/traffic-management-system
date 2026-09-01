const Vehicle = require('../models/Vehicle')
const VehicleHistory = require('../models/VehicleHistory')
const Challan = require('../models/Challan')
const asyncHandler = require('../utils/asyncHandler')
const mongoose = require('mongoose')

exports.getVehicleById = asyncHandler(async (req,res)=>{
  const raw = req.params.vehicleId || ''
  const vehicleId = raw.replace(/[^A-Za-z0-9]/g,'').toUpperCase()
  const vehicle = await Vehicle.findOne({ vehicleId }).select('-__v').populate('owner','name')
  if(!vehicle) return res.status(404).json({ success:false, message:'Vehicle not found' })

  const history = await VehicleHistory.find({ vehicle: vehicle._id }).sort({ date:-1 }).limit(100)
  const challans = await Challan.find({ vehicle: vehicle._id }).sort({ issueDate:-1 })

  // redact sensitive owner fields for public lookups
  const publicOwner = vehicle.owner ? { name: vehicle.owner.name } : null

  res.json({ success:true, data: { vehicle: { ...vehicle.toObject(), owner: publicOwner }, history, challans } })
})

exports.getUserVehicles = asyncHandler(async (req,res)=>{
  const userId = req.user._id
  const vehicles = await Vehicle.find({ owner: userId }).select('-__v')
  res.json({ success:true, data: { vehicles } })
})
