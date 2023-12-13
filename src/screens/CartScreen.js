import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { calculateSizePrice } from "../utils/calculateSizePrice";

const CartScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  //whatever is in the after question mark in url will be shown in qty that is ?qty=1
  //const qty = location.search
  const qty = location ? Number(location.search.split("=")[1]) : 1;
  const size =
    location.state && location.state.activeSize
      ? location.state.activeSize
      : "S";
  //location.search.split('=')[1] means it will split ?qty as 0th index and 1 as 1th index of array and at the end [1] means i want to get the 1 index

  const dispatch = useDispatch();

  //to display in the screen, getting from local storage, method defined in store.js
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //you can check in console
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty, size));
    }
  }, [dispatch, id, qty, size]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/dashboard'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col className='cartImage' md={2}>
                    {item.images && item.images.length > 0 && (
                      <Image
                        className='cartImg'
                        src={item.images[0]}
                        alt={item.name}
                        fluid
                      />
                    )}
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.finalPrice}</Col>
                  <span className='cartSize'>{item.size}</span>
                  <Col md={2} style={{ marginLeft: '20px'}}>
                    {item.qty}
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.cartItemId)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                {/* Subtotal contains all items quantity count,,,, acc is accomolator and item is current item,,,,,0 means accumulator starts from 0*/}
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.finalPrice, 0)
                .toFixed(2)}
              {/* 2 means it will be upto 2 decimals after point*/}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
