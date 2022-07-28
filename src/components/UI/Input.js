//REACT TOOLS
import React from 'react';

//CLASSES
import classes from './Input.module.css';

//COMPONENT
const Input = React.forwardRef((props, ref) => {
  return (
    //INPUT FOR QUANTITY OF FOOD TO ORDER
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
