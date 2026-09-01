const Challan = require('../models/Challan')
const Vehicle = require('../models/Vehicle')
const asyncHandler = require('../utils/asyncHandler')

exports.getMyChallans = asyncHandler(async (req,res)=>{
  const userId = req.user._id
  const vehicles = await Vehicle.find({ owner: userId }).select('_id')
  const vehicleIds = vehicles.map(v=>v._id)
  const challans = await Challan.find({ vehicle: { $in: vehicleIds } }).sort({ issueDate:-1 })
  res.json({ success:true, data: { challans } })
})

exports.getChallansByVehicle = asyncHandler(async (req,res)=>{
  const vehicleIdRaw = req.params.vehicleId || ''
  const vehicleId = vehicleIdRaw.replace(/[^A-Za-z0-9]/g,'').toUpperCase()
  const vehicle = await Vehicle.findOne({ vehicleId })
  if(!vehicle) return res.status(404).json({ success:false, message:'Vehicle not found' })
  // if authenticated, ensure owner or admin
  if(req.user){
    const isOwner = String(vehicle.owner) === String(req.user._id)
    if(!isOwner && req.user.role !== 'admin'){
      // For public access, only return challan summary
      const challans = await Challan.find({ vehicle: vehicle._id }).select('challanNumber violation amount issueDate status')
      return res.json({ success:true, data: { challans } })
    }
  }
  const challans = await Challan.find({ vehicle: vehicle._id })
  res.json({ success:true, data: { challans } })
})
