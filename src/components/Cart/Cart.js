//REACT TOOLS
import { useContext } from 'react';

//CLASSES
import classes from './Cart.module.css';

//IMPORTED COMPONENTS
import Modal from '../UI/Modal';
import CartItem from './CartItem';

//IMPORT ORIGIN OF CONTEXT from React.createContext
//TO USE AS AN ARGUMENT FOF useContext HOOK
import CartContext from '../../store/Cart-Context';

//COMPONENTS
const Cart = (props) => {
  //establish a connection with Context, accepts the context value outputted
  //by React.createContext and then re-render the component
  //whenever its value changes.
  const cartCtx = useContext(CartContext);

  // if there are items in cart allow users to order items
  const hasItems = cartCtx.items.length > 0;

  //rounded total amount
  const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;
  
  //Add Item to Cart
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };
  
  //Remove Item from Cart
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };


  //Output every item in our cart in an unordered list format
  //<ul> li>food<li> </ul>
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemoveItem={() => cartItemRemoveHandler(item.id)}
          onAddItem={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <div>Total Amount</div>
        <div>{totalPrice}</div>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
