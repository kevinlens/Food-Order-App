//ASSETS
import mealsImage from '../../assets/meals.jpg';

//CLASSES
import classes from './Header.module.css';

//IMPORTED COMPONENTS
import HeaderCartButton from './HeaderCartButton';

//COMPONENT
const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </>
  );
};

export default Header;
