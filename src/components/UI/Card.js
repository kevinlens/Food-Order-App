//CLASSES
import classes from './Card.module.css';

//COMPONENT
const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
