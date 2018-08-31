import React from 'react';
import classes from './Input.css';


const input = (props)=>{
    let inputElement = null;

    switch(props.elementType){
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props.elementConfig}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props.elementConfig}/>
            break;
        default: 
            inputElement = <input className={classes.InputElement} {...props.elementConfig}/>
    }
    
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.lable}</label>
            {inputElement}
        </div>
    )
}

export default input;