// REACT TOOLS
import { useContext } from 'react';

//ASSETS
import CartIcon from '../Cart/CartIcon';

//CLASSES
import classes from './HeaderCartButton.module.css';

//IMPORT ORIGIN OF CONTEXT from React.createContext
//TO USE AS AN ARGUMENT FOF useContext HOOK
import CartContext from '../../store/Cart-Context';

//COMPONENT
const HeaderCartButton = (props) => {

  //establish a connection, accepts the context value outputted
  //by React.createContext and then re-render the component
  //whenever its value changes.
  const cartCtx = useContext(CartContext);

  //Get sum of items added
  const numberOfCartItems = cartCtx.items.reduce((previousQuantity, item) => {
    return previousQuantity + item.quantity;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
