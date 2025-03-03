const jwt = require('jsonwebtoken')
const User = require('../models/User')

// @desc    Authenticate admin
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  
  if (user && (await user.matchPassword(password)) && user.isAdmin) {
    res.json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
}

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private/Admin
const logoutAdmin = (req, res) => {
  // Clear the token from the client side (e.g., by removing it from local storage or cookies)
  res.clearCookie('token')
  res.json({ message: 'Admin logged out successfully' })
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  loginAdmin,
  logoutAdmin
}