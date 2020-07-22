const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))

})

blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (body.title === undefined || !body.url === undefined) {
        response.status(400).end()
    } else {

        // const user = await User.findOne()
        // console.log(user.toJSON())

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id,
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog.toJSON())

    }

})

blogsRouter.delete('/:id', async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const userid = decodedToken.id
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === userid.toString()) {
        // await Blog.findByIdAndRemove(request.params.id)
        await blog.remove()
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'invalid user of blog' })
    }


})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter