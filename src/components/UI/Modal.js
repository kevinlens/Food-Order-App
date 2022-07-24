//REACT TOOLS
import {Fragment} from 'react';
import ReactDOM from 'react-dom'

//CLASSES
import classes from './Modal.module.css';

//Dark screen which you click on to exit modal
const Backdrop = (props) => {
  return <div className={classes.backdrop}></div>;
};

//Information/Data for display
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// React Portal's destination to the DOM element 'overlay'
const portalElement = document.getElementById('overlay-root');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
