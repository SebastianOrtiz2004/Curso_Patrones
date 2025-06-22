const express = require('express')
const morgan = require("morgan");
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const authRouter = require('./controllers/auth')
const middleware = require('./utils/middleware')

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(cors())

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', authRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
