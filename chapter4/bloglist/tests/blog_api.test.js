const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const blogsRouter = require('../controllers/blogs')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('blog unique identifier id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

})

describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            _id: "5a422a851b54a676234d1669",
            title: "React Fast",
            author: "Jackie Chan",
            url: "https://wateeeeeeeeer.com/",
            likes: 10,
            __v: 0
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
            'React Fast'
        )
    })

    test('succeeds with missing likes', async () => {
        const newBlog = {
            _id: "5a422a851b54a676234d1238",
            title: "React Faster",
            author: "Jackie Channer",
            url: "https://hydrobois.com/",
            __v: 0
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
    })

    test('fails with missing title/url', async () => {
        const newBlog = {
            _id: "5a422a851b54a676234d1wh7",
            author: "Jackie Channest",
            __v: 0
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        // console.log('blogsAtStart', blogsAtStart)
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('update of a blog', () => {
    test.only('succeeds with updated likes', async () => {
        const blogsAtStart = await helper.blogsInDb()
        // console.log('blogsAtStart', blogsAtStart)
        const blogToUpdate = { ...blogsAtStart[0], likes: 15 }
        // console.log('blogsAtStart[0]', blogsAtStart[0])
        // console.log('blogToUpdate', blogToUpdate)

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).toBe(15)
    })
})

afterAll(() => {
    mongoose.connection.close()
})