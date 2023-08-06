const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes', { content: 1, important: 1 })

  response.json(users)
})

// usersRouter.get('/:id', async (request, response) => {
//   const note = await Note.findById(request.params.id)

//   if (note) {
//     response.json(note)
//   } else {
//     response.status(404).end()
//   }

// })

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// usersRouter.delete('/:id', async (request, response) => {
//   await Note.findByIdAndRemove(request.params.id)
//   response.status(204).end()
// })

// usersRouter.put('/:id', async (request, response) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important,
//   }

//   const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
//   response.json(updatedNote)

// })

module.exports = usersRouter