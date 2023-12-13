import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import { calculateSizePrice } from "../utils/calculateSizePrice";

const backend_url = process.env.REACT_APP_API_BASE_URL;
export const addToCart = (id, qty, size) => async (dispatch, getState) => {
  const { data } = await axios.get(`${backend_url}/api/products/${id}`);
  const cartItemId = `${data._id}_${Date.now()}`;
  // const cartItemId = `${data._id}_${size}`;
  dispatch({
    type: CART_ADD_ITEM,
    //below are the all stuff that you want to display in the cart
    payload: {
      product: data._id,
      name: data.name,
      images: data.images,
      price: data.price,
      countInStock: data.countInStock,
      qty,
      finalPrice: data.price,
      size,
      cartItemId,
    },
  });
  //api to store the cart items locally
  //you can see cart in store.js in which the data comes from reducers
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
