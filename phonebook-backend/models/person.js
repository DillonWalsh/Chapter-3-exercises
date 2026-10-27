const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true 
  },
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

if(process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(person =>{
            console.log(person)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5){
    person.save().then(result =>{
        console.log("added " + person.personName + " number " + person.number + " to phonebook")
        mongoose.connection.close()
    })
}

module.exports = mongoose.model('Person', personSchema)