
//CLASSES
import classes from './Input.module.css';

//COMPONENT
const Input = (props) => {
  return (
    //INPUT FOR AMOUNT OF FOOD TO ORDER
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
