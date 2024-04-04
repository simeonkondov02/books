import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "../css/style.css";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: "",
    cover: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div>
      <div className="header">
        <h1 class="main-title">UPDATE BOOK: <i>{book.title}</i></h1>
      </div>
      <div className="form">
        <input type="text" placeholder="Book title" name="title" value={book.title} onChange={handleChange}/><br></br>
        <textarea rows={5} placeholder="Book desc" name="desc" value={book.desc} onChange={handleChange}/><br></br>
        <input type="text" placeholder="Book cover" name="cover" value={book.cover} onChange={handleChange}/><br></br>
        <button class="button update" onClick={handleClick}>Update</button>
        {error && "Something went wrong!"}
        <Link class="button back" to="/">See all books</Link>
      </div>
    </div>
  );
};

export default Update;
