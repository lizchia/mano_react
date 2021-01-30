export const addItemToCart = (cartItems, itemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === itemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, removedItem) => {
  const removedTarget = cartItems.find(
    cartItem => cartItem.id === removedItem.id
  );

  if (removedTarget.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== removedItem.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === removedItem.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export function sumShipping(items) {
  let shipColdMoney = 0
  let coldItemTotal = 0
  let shipRoomMoney = 0
  let roomItemTotal = 0
  let shipMoney = 0
  let shiptotalMoney = 0

  //計算個別單獨運費
  for (let i = 0; i < items.length; i++) {
    if (items[i].shippingId == 'S001') {
      shipColdMoney += 150
      coldItemTotal += items[i].price * items[i].quantity
    } else if (items[i].shippingId == 'S002') {
      shipRoomMoney += 100
      roomItemTotal += items[i].price * items[i].quantity
    } else {
      shipMoney += 0
    }
  }
  //避免運費重複計算
  if (shipColdMoney > 150) {
    shipColdMoney = 150
  }
  if (shipRoomMoney > 100) {
    shipRoomMoney = 100
  }
  //設定滿額免運
  if (coldItemTotal > 1199) {
    shipColdMoney -= 150
  }
  if (roomItemTotal > 799) {
    shipRoomMoney -= 100
  }
  //計算運費總額
  shiptotalMoney += shipColdMoney
  shiptotalMoney += shipRoomMoney
  shiptotalMoney += shipMoney
  //先把訂單總金額加上運費=(0+運費)
  return shiptotalMoney
}
