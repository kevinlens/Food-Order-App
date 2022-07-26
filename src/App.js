//REACT TOOLS
import {useState } from 'react';

//IMPORTED COMPONENTS
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

//IMPORTED CONTEXT COMPONENT
import CartProvider from './store/CartProvider';

//COMPONENT
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
         {cartIsShown && 
      <Cart onCloseCart={hideCartHandler}/>
         }
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
