import cartActionTypes from "./cartActionTypes";
import { addItemToCart, removeItemFromCart } from "./cartUtils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
  courseCartItems: [],
  orderInfo: "",
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case cartActionTypes.CLEAR_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id
        )
      };
    case cartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
      case cartActionTypes.ADD_COURSEITEM:
        return {
          ...state,
          courseCartItems: addItemToCart(state.courseCartItems, action.payload)
        };
      case cartActionTypes.CLEAR_COURSEITEM:
        return {
          ...state,
          courseCartItems: state.courseCartItems.filter(
            courseCartItem => courseCartItem.id !== action.payload.id
          )
        };
      case cartActionTypes.REMOVE_COURSEITEM:
        return {
          ...state,
          courseCartItems: removeItemFromCart(state.courseCartItems, action.payload)
        };
      case cartActionTypes.SET_ORDERINFO:
        return {
          ...state,
          orderInfo: {...state.orderInfo, ...action.payload}
        };
      case cartActionTypes.CLEAR_ALL:
        return {
          ...state,
          courseCartItems: [],
          cartItems: [],
          orderInfo: ""
        };
   
  
      
  
    default:
      return state;
  }
};

export default cartReducer;
