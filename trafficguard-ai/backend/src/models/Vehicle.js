const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true, unique: true, uppercase:true, trim:true, index:true },
  registrationNumber: { type: String, required: true, unique: true, uppercase:true, trim:true },
  vehicleType: { type: String, enum:['car','bike','truck','bus','other'], required:true },
  manufacturer: { type: String },
  model: { type: String },
  color: { type: String },
  registrationDate: { type: Date },
  registrationStatus: { type: String, enum: ['active','expired','suspended'], default:'active' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true, index:true },
  pendingChallans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challan' }],
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Vehicle', VehicleSchema)
