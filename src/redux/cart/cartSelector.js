import { createSelector } from "reselect";
import { sumShipping } from "./cartUtils";


export const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
)

export const selectCourseCartItems = createSelector(
  [selectCart],
  cart => cart.courseCartItems
)

export const selectOrderInfo = createSelector(
  [selectCart],
  cart => cart.orderInfo
)


export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce((currentCount, cartItem) => currentCount + cartItem.quantity ,0)
)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)


export const selectCartShipTotal = createSelector(
  [selectCartItems],
  cartItems => sumShipping(cartItems)
)