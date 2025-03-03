const express = require('express')
const { protect, admin } = require('../middlewares/authMiddleware')
const {
  createComment,
  getComments,
  deleteComment
} = require('../controllers/commentController')
const router = express.Router()

router.route('/')
  .post(createComment)
  .get(getComments)

router.route('/:id')
  .delete(protect, admin, deleteComment)

module.exports = router