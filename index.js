require('dotenv').config()
const express = require('express')
const app = express()
const dbConnection = require('./config/dbConfig')
const routes = require('./routes')

//middleware
app.use(express.json())
dbConnection()
app.use(routes)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(5000, ()=>{
    console.log("Server is running");

})