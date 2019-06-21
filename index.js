const express = require('express')
const path = require('path')
// const logger = require('./middleware/logger')

const app = express()

const PORT = process.env.PORT || 5000;

// Init middleware
// app.use(logger)

// Init Body Parser Middleware.
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Set static folder
// use() - a method we use when we want to include a middeware.
// Here it will load the whole web site (with html, javascript and css all together)
app.use(express.static(path.join(__dirname,'public')))

/*
* We are using routing to be called from a different directory
* Members api routes
*/
app.use('/api/members', require('./routes/api/members'))

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))