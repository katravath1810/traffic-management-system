const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, lowercase:true },
  email: { type: String, required: true, unique: true, trim: true, lowercase:true },
  password: { type: String, required: true, minlength:6 },
  name: { type: String, required: true, trim:true },
  phone: { type: String },
  vehiclesOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
  role: { type: String, enum: ['user','admin'], default:'user' },
  createdAt: { type: Date, default: Date.now }
})

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.matchPassword = async function(entered){
  return bcrypt.compare(entered, this.password)
}

UserSchema.methods.toJSON = function(){
  const obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model('User', UserSchema)
