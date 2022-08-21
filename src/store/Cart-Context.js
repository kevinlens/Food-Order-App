//REACT TOOLS
import React from 'react';

//If we do anything here the values will
//pretty much stay stagnant can't really changed
// (non-dynamic) that's why we delegate tasks by exporting
const CartContext = React.createContext({
  //these properties aren't actually going to be
  //used, but rather meant to give us better
  //autocompletion by React later on
  items: [],
  totalQuantity: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
