import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

//this is basically props here, I'm de-structuring it, this product comes from Home.js inside screens
const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      {/* instead of href, it takes to attribute */}
      <Link to={`/product/${product._id}`}>
        <Card.Img
          className='homeProductImg'
          src={product.images[0]}
          variant='top'
        />
      </Link>

      <Card.Body className='productBody'>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
