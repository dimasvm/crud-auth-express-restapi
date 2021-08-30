const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// parse requests of content-type: application/json
app.use(express.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// using cors
app.use(cors())

// sync db
const db = require('./app/models')
db.sequelize.sync(
    // {force: true}).then(() => console.log('Drop and Resync Db.')
)

// simple route
app.get('/', (req, res) => {
    res.json({message: "Welcome to my application."})
})

// routes
require('./app/routes/student.routes')(app)
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})