// frontend/src/pages/Dashboard.js
import { useEffect, useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [content, setContent] = useState('');
  

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/books', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, [token]);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/books',
        { title, author, year, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks([...books, res.data]);
      setTitle('');
      setAuthor('');
      setYear('');
      setContent('');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleDelete = async (id) => {
    
    try {
      await axios.delete(`http://localhost:5000/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
    window.location.reload()
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Add New Book</h3>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Content URL"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>

      <h3>All Books</h3>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <h4>{book.title}</h4>
            <p>Author: {book.author}</p>
            <p>Year: {book.year}</p>
            {book.content && (
              <a href={book.content} target="_blank" rel="noopener noreferrer">
                Read Book
              </a>
            )}
            <button onClick={() => handleDelete(book._id)} >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
