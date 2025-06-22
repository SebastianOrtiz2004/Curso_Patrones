const User = require('../models/user');
const userRouter = require('express').Router();
const asyncHandler = require('../utils/asyncHandler')
const bcrypt = require('bcrypt');

userRouter.get('/', asyncHandler(async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    _id: 1
  })

  response.json(users)
}))

userRouter.post('/', asyncHandler(async (request, response) => {
  const body = request.body;

  if (!body.username || !body.password) {
    return response.status(400).json({ error: 'Username and password are required' });
  }

  const passwordHash = await bcrypt.hash(body.password, 10);

  const userObject = {
    ...body,
    password: passwordHash
  }

  const user = new User(userObject)

  const result = await user.save()

  response.status(201).json(result)
}))

userRouter.delete('/:id', asyncHandler(async (request, response) => {
  const { id } = request.params;
  const result = await User.findByIdAndDelete(id);

  if (!result) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  response.status(204).end();
}))

userRouter.put('/:id', asyncHandler(async (request, response) => {
  const { id } = request.params;
  const body = request.body;
  const updatedBlog = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });

  if (!updatedBlog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  response.status(200).json(updatedBlog);
}));

module.exports = userRouter;