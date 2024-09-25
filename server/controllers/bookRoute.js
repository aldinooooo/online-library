const express = require('express')
const router = express.Router()

const Book = require ('../models/book')

//get all books
const home = async(req,res)=>{
    try {
        const books = await Book.find()
        res.json(books)
    } catch (err) {
        res.status(500).json({
            message:'Server Error'
        })
    }
}
const getBooks = async(req,res)=>{
    try {
        const books = await Book.find()
        res.json(books)
    } catch (err) {
        res.status(500).json({
            message:'Server Error'
        })
    }
}
//get a single book using id
const getBook = async(req,res)=>{
    try {
        const book = await Book.findById(req.params.id)
        if(!book) return res.status(404).json({message:'Book not found'})
        res.json(book)
    } catch (err) {
        res.status(500).json({
            message:'Server error'
        })
    }
}

//add books (admin only)
const addBook = async(req,res)=>{
    const {title,author,year,content}=req.body
    if(!title || !author || !year){
        return res.status(400).json({
            message:'Please enter all required fields'
        })
    }
    try {
        const newBook = new Book({
            title,
            author,
            year,
            content
        })
        const savedBook = await newBook.save()
        res.json(savedBook)
    } catch (err) {
        res.status(500).json({
            message:'Server error'
        })
    }
}

//update a book(admin only)
const updateBook = async(req,res)=>{
    const {title,author,year,content}=req.body
    try {
        let book = await Book.findByIdAndUpdate(req.params.id)
        if(!book) return res.status(404).json({
            message:'Book not found'
        })
        book.title = title || book.title
        book.author = author || book.author
        book.year = year || book.year
        book.content = content || book.content
    
        const updatedBook = await book.save()
        res.json(updatedBook)
    } catch (err) {
        res.status(500).json({
            message:'Server error'
        })
    }
}

//delete a book(admin only)
const deleteBook = async(req,res)=>{
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        if (!book) return res.status(404).json({
            message:'Book not found'
        })
        await book.remove()
        res.json({
            message:'Book removed'
        })
    } catch (err) {
        res.status(500).json({
            message:'Server error'
        })
    }
}

module.exports = {home,getBooks,getBook,addBook,updateBook,deleteBook}
