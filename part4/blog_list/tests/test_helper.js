const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Author One',
    url: 'http://example.com/first',
    likes: 10
  },
  {
    title: 'Second Blog',
    author: 'Author Two',
    url: 'http://example.com/second',
    likes: 20
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}