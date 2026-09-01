const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
const User = require('./models/User')
const Vehicle = require('./models/Vehicle')
const Challan = require('./models/Challan')
const VehicleHistory = require('./models/VehicleHistory')

const run = async ()=>{
  await connectDB(process.env.MONGO_URI)
  await Promise.all([User.deleteMany({}), Vehicle.deleteMany({}), Challan.deleteMany({}), VehicleHistory.deleteMany({})])

  const u1 = await User.create({ name:'Amit Roy', username:'amit', email:'amit@example.com', password:'password123', phone:'9999990001' })
  const u2 = await User.create({ name:'Sima Das', username:'sima', email:'sima@example.com', password:'password123', phone:'9999990002' })

  const v1 = await Vehicle.create({ vehicleId:'WB01AB1234', registrationNumber:'WB 01 AB 1234', vehicleType:'car', manufacturer:'Toyota', model:'Corolla', color:'White', registrationDate:new Date('2019-01-01'), owner: u1._id })
  const v2 = await Vehicle.create({ vehicleId:'WB02XY5678', registrationNumber:'WB 02 XY 5678', vehicleType:'bike', manufacturer:'Honda', model:'CBR', color:'Red', registrationDate:new Date('2018-05-10'), owner: u1._id })
  const v3 = await Vehicle.create({ vehicleId:'WB06CD9012', registrationNumber:'WB 06 CD 9012', vehicleType:'car', manufacturer:'Hyundai', model:'i20', color:'Blue', registrationDate:new Date('2020-03-15'), owner: u2._id })

  u1.vehiclesOwned.push(v1._id, v2._id)
  u2.vehiclesOwned.push(v3._id)
  await u1.save(); await u2.save()

  const c1 = await Challan.create({ vehicle: v1._id, challanNumber:'C-1001', violation:'Red Light', amount:1000, issueDate:new Date('2026-08-20'), dueDate:new Date('2026-09-20'), status:'pending', location:'Shibpur Junction' })
  const c2 = await Challan.create({ vehicle: v1._id, challanNumber:'C-1002', violation:'Overspeed', amount:500, issueDate:new Date('2026-07-10'), dueDate:new Date('2026-08-10'), status:'paid', location:'Kolkata Expressway' })
  const c3 = await Challan.create({ vehicle: v2._id, challanNumber:'C-1003', violation:'No Helmet', amount:200, issueDate:new Date('2026-06-01'), status:'pending', location:'Salt Lake' })

  await VehicleHistory.create({ vehicle: v1._id, eventType:'challan', description:'Red light violation issued', date:new Date('2026-08-20'), location:'Shibpur Junction', status:'pending' })
  await VehicleHistory.create({ vehicle: v1._id, eventType:'challan', description:'Overspeed - paid', date:new Date('2026-07-10'), location:'Expressway', status:'paid' })
  await VehicleHistory.create({ vehicle: v2._id, eventType:'registration', description:'Vehicle registration completed', date:new Date('2018-05-10'), status:'active' })

  console.log('Seed complete')
  process.exit(0)
}

run().catch(err=>{ console.error(err); process.exit(1) })
