import React from 'react';
import classes from './Modal.css';
import Wrap from '../../../hoc/Wrap';
import Backdrop from '../BackDrop/Backdrop';

const modal = (props)=>(
    <Wrap>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Wrap>
);

export default modal;