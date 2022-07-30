// REACT TOOLS
import { useContext, useEffect, useState } from 'react';

//ASSETS
import CartIcon from '../Cart/CartIcon';

//CLASSES
import classes from './HeaderCartButton.module.css';

//IMPORT ORIGIN OF CONTEXT from React.createContext
//TO USE AS AN ARGUMENT FOF useContext HOOK
import CartContext from '../../store/Cart-Context';

//COMPONENT
const HeaderCartButton = (props) => {
  //STATE
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  //establish a connection with Context, accepts the context value outputted
  //by React.createContext and then re-render the component
  //whenever its value changes.
  const cartCtx = useContext(CartContext);

  //Get sum of items added
  const numberOfCartItems = cartCtx.items.reduce((previousQuantity, item) => {
    return previousQuantity + item.quantity;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    //if cart empty, don't animate button
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    //reset button animation
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    //clear previous three millisecond timer animation reset 
    //and start over
    return () => {
      clearTimeout(timer)
    }
    
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
