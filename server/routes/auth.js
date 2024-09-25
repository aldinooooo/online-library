const express = require('express');
const router = express.Router();
const cors = require('cors');
const registerUser = require('../controllers/registerRoute');
const loginUser = require('../controllers/loginRoute');
const { getBooks, getBook, addBook, updateBook, deleteBook, home } = require('../controllers/bookRoute');
const  adminAuth  = require('../middleware/auth');

// Middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173' 
  })
);

// Routes
router.get('/', home); // Home route to show all books (this is okay if that’s the intent)
router.post('/register', registerUser);
router.get('/books', getBooks);
router.post('/login', loginUser);
router.post('/books', adminAuth, addBook); 
router.get('/books/:id', getBook);
router.put('/books/:id', adminAuth, updateBook); 
router.delete('/books/:id', adminAuth, deleteBook);

module.exports = router;
