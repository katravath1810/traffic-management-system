const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorMiddleware')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

const CLIENT = process.env.CLIENT_URL || 'http://localhost:5173'
app.use(cors({ origin: CLIENT, credentials: true }))

// connect DB
connectDB(process.env.MONGO_URI)

// routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/vehicles', require('./routes/vehicleRoutes'))
app.use('/api/challans', require('./routes/challanRoutes'))

app.get('/api/health', (req,res)=>res.json({ success:true, ok:true }))

// 404
app.use((req,res,next)=>{
  res.status(404).json({ success:false, message:'Not Found' })
})

app.use(errorHandler)

module.exports = app
