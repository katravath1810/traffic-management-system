const mongoose = require('mongoose')

const VehicleHistorySchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required:true, index:true },
  eventType: { type: String, enum: [
    'registration','ownership_transfer','challan','insurance','fitness','service','accident','inspection','other'
  ], required:true },
  description: { type: String, required:true },
  date: { type: Date, required:true },
  location: { type: String },
  status: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
})

VehicleHistorySchema.index({ vehicle:1, date:-1 })

module.exports = mongoose.model('VehicleHistory', VehicleHistorySchema)
