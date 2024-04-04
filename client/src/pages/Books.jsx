import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "../css/style.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Състояние за съхранение на търсената дума

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBooks = searchTerm.length >= 3
    ? books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase())) : books;

  return (
    <div>
      <div className="header">
        <h1 className="main-title">BOOKS DATABASE</h1>
        <input className="search-txt-box" type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <button className="addHome add button">
          <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>Add new book</Link>
        </button>
      </div>
      <div className="books">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book">
          <div className="book-content">
            <div className="book-title-container">
              <img className="book-image" src={"../resources/covers/" + book.cover}/>
              <h2 className="book-title">{book.title}</h2>
            </div>
            <div className="buttons">
              <button className="button delete" onClick={() => handleDelete(book.id)}>Delete</button>
              <button className="button update">
                <Link to={`/update/${book.id}`} style={{ color: "inherit", textDecoration: "none" }}>Update</Link>
              </button>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
