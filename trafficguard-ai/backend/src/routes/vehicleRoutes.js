const express = require('express')
const router = express.Router()
const vehicleController = require('../controllers/vehicleController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:vehicleId', vehicleController.getVehicleById)
router.get('/my-vehicles', authMiddleware, vehicleController.getUserVehicles)

module.exports = router
