import React from 'react';
import classes from './BuildControl.css';
const buildControl = (props)=>(
    <div className={classes.BuildControl}>
        <h2 className={classes.Label}>{props.label}</h2>
        <button className={classes.Less} onClick={props.removed}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
)
export default buildControl;