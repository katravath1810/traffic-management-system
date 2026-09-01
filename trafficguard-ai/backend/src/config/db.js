const mongoose = require('mongoose')
let mongoServerInstance = null

const connectDB = async (uri) => {
  try{
    let mongoUri = uri || process.env.MONGO_URI
    if(!mongoUri){
      // fallback to in-memory mongo for local dev when no MONGO_URI provided
      try{
        const { MongoMemoryServer } = require('mongodb-memory-server')
        mongoServerInstance = await MongoMemoryServer.create()
        mongoUri = mongoServerInstance.getUri()
        console.log('Using in-memory MongoDB')
      }catch(e){
        throw new Error('MONGO_URI not provided and mongodb-memory-server not available')
      }
    }
    await mongoose.connect(mongoUri)
    console.log('MongoDB connected')
    return mongoServerInstance
  }catch(err){
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
