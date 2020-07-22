const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.get('/', async (request, response) => {

    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))

})

usersRouter.post('/', async (request, response) => {

    const body = request.body

    if (body.password.length < 3) {
        return response.status(400).json({ errors: ['password must be at least 3 characters long'] }).end()
    }
    
    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser.toJSON())
})

module.exports = usersRouter