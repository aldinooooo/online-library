const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true,
    },
    content:{
        type:String
    }
})

const BookModel = mongoose.model('Book',BookSchema)

module.exports = BookModel