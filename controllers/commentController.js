const Comment = require('../models/Comment')
const Post = require('../models/Post')

// @desc    Create new comment
// @route   POST /api/comments
// @access  Public
const createComment = async (req, res) => {
  const { content, postId, author, isAdmin } = req.body

  if (!content || !postId || !author) {
    res.status(400)
    throw new Error('Please provide all required fields')
  }

  const post = await Post.findById(postId)
  if (!post) {
    res.status(404)
    throw new Error('Post not found')
  }

  const comment = await Comment.create({
    content,
    post: postId,
    author,
    isAdmin: isAdmin || false
  })

  // Add comment to post
  post.comments.push(comment._id)
  await post.save()

  res.status(201).json(comment)
}

// @desc    Get comments for a post
// @route   GET /api/comments?post=:postId
// @access  Public
const getComments = async (req, res) => {
  const { post } = req.query

  if (!post) {
    res.status(400)
    throw new Error('Post ID is required')
  }

  const comments = await Comment.find({ post })
    .sort('-createdAt')
    .limit(100)

  res.json(comments)
}

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private/Admin
const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id)

  if (!comment) {
    res.status(404)
    throw new Error('Comment not found')
  }

  // Remove comment from post
  await Post.updateOne(
    { _id: comment.post },
    { $pull: { comments: comment._id } }
  )

  await comment.remove()
  res.json({ message: 'Comment removed' })
}

module.exports = {
  createComment,
  getComments,
  deleteComment
}