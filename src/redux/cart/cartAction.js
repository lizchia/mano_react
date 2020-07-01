import cartActionTypes from "./cartActionTypes";

export const toggleCartHidden = () => ({
  type: cartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: cartActionTypes.ADD_ITEM,
  payload: item
});

export const clearItem = item => ({
  type: cartActionTypes.CLEAR_ITEM,
  payload: item
});

export const removeItem = item => ({
  type: cartActionTypes.REMOVE_ITEM,
  payload: item
});

export const addCourseItem = item => ({
  type: cartActionTypes.ADD_COURSEITEM,
  payload: item
});

export const clearCourseItem = item => ({
  type: cartActionTypes.CLEAR_COURSEITEM,
  payload: item
});

export const removeCourseItem = item => ({
  type: cartActionTypes.REMOVE_COURSEITEM,
  payload: item
});

export const setOrderInfo = item => ({
  type: cartActionTypes.SET_ORDERINFO,
  payload: item
});

export const clearAll = () => ({
  type: cartActionTypes.CLEAR_ALL
});


