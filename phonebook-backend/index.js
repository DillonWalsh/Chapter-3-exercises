require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const Person = require('./models/person')
const app = express()



app.use(express.static('dist'))
app.use(express.json())
app.use(morgan("tiny"))

let persons = [
    { 
      "id": "1",  
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then (persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const bookSize = persons.length
  const time = new Date().toString()
  response.send('Phonebook has info for ' +  bookSize + ' people </br> ' + time)
}) 

/** Find person by ID */
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) =>{
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})



app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = new Person( {
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }) 
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
