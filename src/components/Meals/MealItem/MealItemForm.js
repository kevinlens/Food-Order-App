//REACT TOOLS
import { useRef, useState } from 'react';

//CLASSES
import classes from './MealItemForm.module.css';

//IMPORTED COMPONENT
import Input from '../../UI/Input';

//COMPONENT
const MealItemForm = (props) => {
  //STATE
  const [quantityIsValid, setQuantityIsValid] = useState(true);

  //REFS OBJECT!
  //Target user input to get item quantity
  const quantityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    //user entered quantity
    const enteredQuantity = quantityInputRef.current.value;
    //convert string to a real number
    const enteredQuantityNumber = +enteredQuantity;

    //MUST MEET CRITERIA OF NEEDED QUANTITY
    if (
      enteredQuantity.trim().length === 0 ||
      enteredQuantityNumber < 1 ||
      enteredQuantityNumber > 5
    ) {
      setQuantityIsValid(false);
      return;
    }

    // Pass back item quantity for calculations and display current quantity
    // on header
    props.onAddToCart(enteredQuantityNumber);

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {/* UI INPUT FOR QUANTITY OF FOOD TO ORDER */}
      <Input
        ref={quantityInputRef}
        label='Quantity'
        input={{
          id: 'quantity_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!quantityIsValid && <p>Please enter a valid amount (1-5). </p>}
    </form>
  );
};

export default MealItemForm;
