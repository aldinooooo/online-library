const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//connect to database
mongoose.connect(process.env.MONGO_URL)
.then(console.log(`Mongo DB is connected`))
.catch((err)=>console.error(err))

//routes
app.use('/',require('./routes/auth'))

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})