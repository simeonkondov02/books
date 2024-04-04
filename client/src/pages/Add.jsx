import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../css/style.css";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    cover: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", {
        title: book.title,
        description: book.desc,
        cover: book.cover
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div>
      <div className="header">
        <h1 class="main-title">CREATE NEW BOOK</h1>
      </div>
      <div className="form">
        <input type="text" placeholder="Book title" name="title" onChange={handleChange}/><br></br>
        <textarea rows={5} type="text" placeholder="Book desc" name="desc" onChange={handleChange}/><br></br>
        <input type="text" placeholder="Book cover" name="cover" onChange={handleChange}/><br></br>
        <button className="button add" onClick={handleClick}>Add</button>
        {error && "Something went wrong!"}
        <Link className="button back" to="/">See all books</Link>
      </div>
    </div>
  );
};

export default Add;
