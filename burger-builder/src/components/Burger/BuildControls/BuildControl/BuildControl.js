import React from 'react';
import classes from './BuildControl.css';
const buildControl = (props)=>{
    <div className={classes.BuildControl}>
        <h2 className={classes.Label}>{props.label}</h2>
        <button className={classes.Less}>Less</button>
        <button className={classes.More}>More</button>
    </div>
}
export default buildControl;