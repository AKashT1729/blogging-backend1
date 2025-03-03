const express = require('express')
const { protect, admin } = require('../middlewares/authMiddleware')
const {
  createPost,
  getPosts
} = require('../controllers/postController')
const router = express.Router()

router.route('/')
  .get(getPosts)
  .post(protect, admin, createPost)

module.exports = router