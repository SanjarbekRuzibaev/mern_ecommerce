import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form style={{ gap: "20px" }} onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5 custom-input'
        style={{ borderRadius: "10px" }}
      ></Form.Control>
      <button className='searchBtn' type='submit'>
        <i class='fa-solid fa-search searchIcon'></i>
        Search
      </button>
    </Form>
  );
};

export default SearchBox;
