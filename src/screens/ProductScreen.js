import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { calculateSizePrice } from "../utils/calculateSizePrice";
import Meta from "../components/Meta";
//import products from '../products'

const ProductScreen = () => {
  //high order array
  //i will get an id as parameter in this screen
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  //when fetch products from frontend
  // const product = products.find(p => p._id === id)
  //when fetch products from state
  //const [product, setProduct] = useState({})

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activeImg, setActiveImg] = useState("");

  // Product sizes variations
  const sizes = ["S", "M", "L", "XL"];
  const [activeSize, setActiveSize] = useState("S");
  const handleSizeClick = (size) => {
    setActiveSize(size);
  };

  //when fetch from redux
  const dispatch = useDispatch();

  //const product = {}
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    // if (!product._id || product._id !== id) {
    dispatch(listProductDetails(id));
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    // }
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`, { state: { activeSize } });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      }),
    );
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/dashboard'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              {product.images && product.images.length > 0 && (
                <Image
                  src={activeImg || product.images[0]}
                  alt={product.name}
                  fluid
                />
              )}

{product.images && product.images.length > 0 && (
                <div className='multiImgContainer'>
                  <Image
                    onClick={() => setActiveImg(product.images[0])}
                    className='multiImg'
                    src={product.images[0]}
                    alt={product.name}
                    fluid
                  />
                  {
                    product.images[1] && <>
                     <Image
                    onClick={() => setActiveImg(product.images[1])}
                    className='multiImg'
                    src={product.images[1]}
                    alt={product.name}
                    fluid
                    />
                    </>
                  }
                  {
                    product.images[2] && <>
                     <Image
                    onClick={() => setActiveImg(product.images[2])}
                    className='multiImg'
                    src={product.images[2]}
                    alt={product.name}
                    fluid
                    />
                    </>
                  }
                 
                </div>
              )}
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
                <ListGroup.Item>Size</ListGroup.Item>
                <div className='sizes'>
                  {sizes.map((size) => (
                    <span
                      key={size}
                      className={`size ${
                        activeSize === size ? "activeSize" : ""
                      }`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ),
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
             
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          
        </>
      )}
    </>
  );
};

export default ProductScreen;
