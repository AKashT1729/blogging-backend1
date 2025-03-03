const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const connectDB = require('./cofig/db')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

dotenv.config()
connectDB()

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/comments', require('./routes/commentRoutes'))




// Add after routes
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)