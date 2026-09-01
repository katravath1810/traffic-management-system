const express = require('express')
const router = express.Router()
const challanController = require('../controllers/challanController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/my', authMiddleware, challanController.getMyChallans)
router.get('/vehicle/:vehicleId', challanController.getChallansByVehicle)

module.exports = router
