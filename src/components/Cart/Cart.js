//REACT TOOLS
import { useContext, useState } from 'react';

//CLASSES
import classes from './Cart.module.css';

//IMPORTED COMPONENTS
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

//IMPORT ORIGIN OF CONTEXT from React.createContext
//TO USE AS AN ARGUMENT FOF useContext HOOK
import CartContext from '../../store/Cart-Context';

//COMPONENTS
const Cart = (props) => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

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

  //Make form visible upon user order
  const orderHandler = () => {
    setIsCheckedOut(true);
  };

  //Close + Order Button
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  //SUBMIT HTTP POST REQUEST
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://react-http-f9bb8-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (error) {
      setIsSubmitting(false);
      setError(error.message);
    }
  };

  let errorMessage = '';
  if (error) {
    errorMessage = <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

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

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <div>Total Amount</div>
        <div>{totalPrice}</div>
      </div>
      <section>{errorMessage}</section>
      {isCheckedOut && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCloseCart={props.onCloseCart}
        />
      )}
      {!isCheckedOut && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data....</p>;
  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
