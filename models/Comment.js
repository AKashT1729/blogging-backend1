const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  author: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)