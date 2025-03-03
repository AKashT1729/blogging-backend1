const Post = require('../models/Post')

// @desc    Create new post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = async (req, res) => {
  const { title, content, image } = req.body

  const post = await Post.create({
    title,
    content,
    image,
    author: req.user.id
  })

  res.status(201).json(post)
}

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  const posts = await Post.find()
    .sort('-createdAt')
    .populate('author', 'username')

  res.json(posts)
}

module.exports = {
  createPost,
  getPosts
}