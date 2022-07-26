// REACT TOOLS
import { useContext } from 'react';

//ASSETS
import CartIcon from '../Cart/CartIcon';

//CLASSES
import classes from './HeaderCartButton.module.css';

//IMPORT ORIGIN OF CONTEXT from React.createContext
//TO USE AS AN ARGUMENT FOF useContext HOOK
import CartContext from '../../store/Cart-Context';

const HeaderCartButton = (props) => {
  //accepts the context value outputted by React.createContext and then
  //re-render the component whenever its value changes.
  cartCtx = useContext(CartContext);

  //Get sum value of items in cart
  const numberOfCartItems = cartCtx.items.reducer((previousAmount, item) => {
    return previousAmount + item.amount;
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
