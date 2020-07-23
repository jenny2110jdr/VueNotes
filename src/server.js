const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const finale = require('finale-rest')

let app = express()
app.use(cors())
app.use(bodyParser.json())

// we are going to use SQLite to store our notes
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './notes.sqlite'
})

// Define our Note model
// id, createdAt, and updatedAt are added by sequelize automatically
let Notes = database.define('notes', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
})

// Initialize finale. We pass in the express instance and database being handled by sequelize
finale.initialize({
  app: app,
  sequelize: database
})

// Create the dynamic REST resource for our Note model using finale
finale.resource({
  model: Notes,
  endpoints: ['/notes', '/notes/:id']
})

// sync with force:true will drop the table. This is to be used ONLY when testing.
// If you restart your server, the data will be gone.
database
  .sync({ force: true })
  .then(() => {
    app.listen(1234, () => {
      console.log('listening to port localhost:1234')
    })
  })