const express = require('express')
const { loginAdmin, logoutAdmin } = require('../controllers/authController')
const { protect, admin } = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/login', loginAdmin)
router.post('/logout', protect, admin, logoutAdmin)

module.exports = router