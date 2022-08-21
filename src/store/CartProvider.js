//REACT TOOLS
import React from 'react';
import { useReducer } from 'react';

//IMPORTING IN THE ORIGIN OF CONTEXT OBJECT
//TO USE THE CONTEXT's PROVIDER FEATURE
import CartContext from './Cart-Context';

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

//REDUCER
const cartReducer = (state, action) => {

  if (action.command === 'ADD') {
    //calculate total price of all items
    const updatedTotalPrice =
      state.totalPrice + action.item.price * action.item.quantity;

    //Finds the first index number that fulfil requirements
    //Returns either an existing index number OR -1
    const indexOfExistingCartItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //If the newly added item already exists in our state,
    //retrieve it using it's index, else undefined
    const existingCartItem = state.items[indexOfExistingCartItem];

    let updatedItemsList;

    //if the new item already exists in the state's items array, else...
    //to prevent duplicates
    if (existingCartItem) {
      //update existing item's quantity in cart
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      //a copy of current state's items array
      updatedItemsList = [...state.items];
      //updating specific item in the copy of the state's items array
      //with the updated item with it's new quantity
      updatedItemsList[indexOfExistingCartItem] = updatedItem;
    } else {
      //add new item to current array -> new array
      updatedItemsList = state.items.concat(action.item);
    }
    //update current state
    return {
      items: updatedItemsList,
      totalPrice: updatedTotalPrice,
    };
  }

  if (action.command === 'REMOVE') {
    //Finds the first index number that fulfil requirements
    //Returns either an existing index number OR -1
    //NUMBER
    const indexOfExistingCartItem = state.items.findIndex(
      (item) => item.id === action.id
    );

    //If the newly added item already exists in our state,
    //retrieve it using it's index, else undefined
    //@returns Object
    const existingCartItem = state.items[indexOfExistingCartItem];

    //remove item's price from cart's total price
    //@returns Number
    const updatedTotalPrice = state.totalPrice - existingCartItem.price;

    let updatedItemsList;

    if (existingCartItem.quantity === 1) {
      //Isolate items we're trying to remove from our state
      //Returns an array free of that item we're trying to remove
      //@returns Array
      updatedItemsList = state.items.filter((item) => item.id !== action.id);
    } else {
      //Edit target item, decrease quantity by one
      //@returns Object
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      //retrieve current state item's array
      updatedItemsList = [...state.items];
      //update retrieve state item's array with index of item-to-be-updated
      updatedItemsList[indexOfExistingCartItem] = updatedItem;
    }

    //update current state
    return {
      items: updatedItemsList,
      totalPrice: updatedTotalPrice,
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  //default our state
  return defaultCartState;
};

//COMPONENT
const CartProvider = (props) => {
  //REDUCER STATE
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  //METHODS
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ command: 'ADD', item: item });
  };
  //METHODS
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ command: 'REMOVE', id: id });
  };
  //METHODS
  const clearCartHandler = () => {
    dispatchCartAction({ command: 'CLEAR' });
  };

  //CONCRETE CONTEXT VALUES THAT ALLOWS
  //FOR UPDATING CONTEXT FROM OTHER COMPONENTS
  const cartContext = {
    //values
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    //methods
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler 
  };

  //COMPONENTS/CHILDREN INSIDE OF THIS PROVIDER WILL
  //HAVE ACCESS TO THE GLOBAL OBJECT
  //PROVIDER IS WHAT MAKES OUR CONTEXT DATA DYNAMIC
  return (
    //passing in our custom context object 'cartContext'
    //that will handle and change the global context origin
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
