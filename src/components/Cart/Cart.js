//CLASSES
import classes from './Cart.module.css';

//IMPORTED COMPONENTS
import Modal from '../UI/Modal';

//COMPONENTS
const Cart = (props) => {
  //<ul> li>food<li> </ul>
  const cartItems = (
    <ul className={classes['cart-items']}>
      {[{ id: 'c1', name: 'Sushi', amount: 2, price: 12.99 }].map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <div>Total Amount</div>
        <div>35.62</div>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCloseCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
