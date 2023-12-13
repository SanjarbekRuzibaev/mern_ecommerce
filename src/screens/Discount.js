import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { createCategory } from "../apis/categories";
import { addDiscount } from "../apis/discount";

const Discount = () => {
  const navigate = useNavigate();
  const [newDiscountRate, setNewDiscountRate] = useState(0);
  const submitHandler = (e) => {
    e.preventDefault();
    addDiscount({ newDiscountRate: +newDiscountRate / 100 }, navigate);
  };
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Discount</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Percentage</Form.Label>
            <Form.Control
              placeholder='Enter Percentage'
              onChange={(e) => setNewDiscountRate(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            disabled={!newDiscountRate}
            className='mt-3'
            type='submit'
            variant='primary'
          >
            Edit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Discount;
