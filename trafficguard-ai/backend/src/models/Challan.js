const mongoose = require('mongoose')

const ChallanSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required:true, index:true },
  challanNumber: { type: String, required:true, unique:true },
  violation: { type: String, required:true },
  amount: { type: Number, required:true, min:0 },
  issueDate: { type: Date, required:true },
  dueDate: { type: Date },
  status: { type: String, enum:['pending','paid','cancelled'], default:'pending' },
  location: { type: String },
  createdAt: { type: Date, default: Date.now }
})

ChallanSchema.index({ vehicle:1, status:1, issueDate:-1 })

module.exports = mongoose.model('Challan', ChallanSchema)
