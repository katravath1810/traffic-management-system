const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/me', authMiddleware, userController.getCurrentUser)
router.get('/dashboard', authMiddleware, userController.getDashboard)

module.exports = router
