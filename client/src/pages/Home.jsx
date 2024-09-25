import {useEffect, useState} from 'react'
import axios from 'axios'

const Home = ()=>{
  const [books, setBooks] = useState([])
  useEffect(()=>{
    const fetchBooks = async ()=>{
      try {
        const res = await axios.get('http://localhost:5000/books')
        setBooks(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchBooks()
  },[])
  return (
    <div>
      <h1>All Books</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Year: {book.year}</p>
            {book.content && (
              <a href={book.content} target="_blank" rel="noopener noreferrer">
                Read Book
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Home