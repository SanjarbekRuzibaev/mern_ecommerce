import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action,
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // const item = action.payload;

      // const existItem = state.cartItems.find((x) => x.product === item.product);

      // if (existItem) {
      //   return {
      //     ...state,
      //     cartItems: state.cartItems.map((x) =>
      //       //map the current items
      //       x.product === existItem.product ? item : x,
      //     ),
      //   };
      // } else {
      //   return {
      //     ...state,
      //     //first arg is current item and second arg is new item
      //     cartItems: [...state.cartItems, item],
      //   };
      // }
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product === newItem.product && item.size === newItem.size
      );
    
      if (existingItemIndex !== -1) {
        // If the same product with the same size already exists, update its quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].qty += newItem.qty;
    
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // If the product with the same size doesn't exist, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        //if we are in state then fireoff the after comma statement
        ...state,
        cartItems: state.cartItems.filter((x) => x.cartItemId !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
