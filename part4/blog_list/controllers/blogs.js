const Blog = require('../models/blog');
const blogRouter = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogRouter.get('/', asyncHandler(async (request, response) => {
  const blogs = await Blog.find({}).populate('author', {
    username: 1,
    name: 1,
  })

  response.json(blogs)
}))

blogRouter.post('/', asyncHandler(async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  const userId = decodedToken.id;

  if (!userId) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }

  const userAuthor = await User.findById(userId);

  const blogObject = {
    ...request.body,
    author: userAuthor._id,
  }

  const blog = new Blog(blogObject)

  const result = await blog.save()

  userAuthor.blogs = userAuthor.blogs.concat(result._id);
  await userAuthor.save();

  response.status(201).json(result)
}))

blogRouter.delete('/:id', asyncHandler(async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  const userId = decodedToken.id;

  if (!userId) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }

  const { id } = request.params;

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  if (blog.author.toString() !== userId) {
    return response.status(401).json({ error: 'You do not have permission to delete this blog' });
  }

  await blog.deleteOne();

  response.status(204).end();
}))

blogRouter.put('/:id', asyncHandler(async (request, response) => {
  const { id } = request.params;
  const body = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true });

  if (!updatedBlog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  response.status(200).json(updatedBlog);
}));

module.exports = blogRouter;