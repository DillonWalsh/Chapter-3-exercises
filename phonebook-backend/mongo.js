const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://dwalsh0000_db_user:${password}@cluster0.dubhdbu.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })


const personSchema = new mongoose.Schema({
  personName: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person =  new Person({
    personName: process.argv[3],
    number: process.argv[4],
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
