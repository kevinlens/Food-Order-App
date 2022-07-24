//CLASSES
import classes from './MealItemForm.module.css';

//IMPORTED COMPONENT
import Input from '../../UI/Input';

//COMPONENT
const MealItemForm = (props) => {
  return (
    <form className={classes.form}>
      {/* UI INPUT FOR AMOUNT OF FOOD TO ORDER */}
      <Input
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
