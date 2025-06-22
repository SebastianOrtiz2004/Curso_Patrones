require('dotenv').config()

const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../main')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Initial notes test', () => {
  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct quantity of blogs', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    assert.strictEqual(blogs.length, helper.initialBlogs.length)
  })

  test('blogs have id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    const hasId = blogs.every(blog => blog.id)

    assert.strictEqual(hasId, true)
  })

  describe('Adding new blogs', () => {
    test('adding a blog works', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 5
      }
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const result = response.body
      assert.strictEqual(result.title, newBlog.title)
      assert.strictEqual(result.author, newBlog.author)
      assert.strictEqual(result.url, newBlog.url)
      assert.strictEqual(result.likes, newBlog.likes)
    })

    test('adding a blog without likes works', async () => {
      const newBlog = {
        title: 'Test Blog Without Likes',
        author: 'Test Author Without Famous',
        url: 'http://likesfaltan.com',
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const result = response.body
      assert.strictEqual(result.title, newBlog.title)
      assert.strictEqual(result.author, newBlog.author)
      assert.strictEqual(result.url, newBlog.url)
      assert.strictEqual(result.likes, 0)
    })

    test('try to add blog without throws 400', async () => {
      const newBlog = {
        url: 'http://likesfaltan.com',
        likes: 5
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('Deleting blogs', () => {
    test('deleting a blog works', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const contents = blogsAtEnd.map(r => r.title)
      assert(!contents.includes(blogToDelete.title))
    })
  })

  describe('Updating blog likes', () => {
    test('updating a blog works', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const result = response.body
      assert.strictEqual(result.likes, updatedBlog.likes)
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})