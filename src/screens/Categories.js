import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { createCategory } from "../apis/categories";

const Categories = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    createCategory({ name, priceRange }, navigate);
  };
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Category</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='name'>
            <Form.Label>Price Range</Form.Label>
            <Form.Control
              placeholder='Enter price range'
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            disabled={!name || !priceRange}
            className='mt-3'
            type='submit'
            variant='primary'
          >
            Add
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Categories;
