//REACT TOOLS
import { useContext } from 'react';

//CLASSES
import classes from './MealItem.module.css';

//IMPORT ORIGIN OF CONTEXT from React.createContext
//TO USE AS AN ARGUMENT FOF useContext HOOK
import CartContext from '../../../store/Cart-Context';

//IMPORTED COMPONENT 
import MealItemForm from './MealItemForm';

//COMPONENT
const MealItem = (props) => {

  //establish a connection with Context, accepts the context value outputted
  //by React.createContext and then re-render the component
  //whenever its value changes.
  const cartCtx = useContext(CartContext);

  //Output --> ${price}
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = quantity => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      quantity: quantity,
      price: props.price
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>

      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
