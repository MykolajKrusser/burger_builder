import React from 'react';
import classes from './Loader.css'
const loader = (props)=>(
    <div className={classes.PanLoader}>
        <div className={classes.Loader}></div>
            <div className={classes.PanContainer}>
                <div className={classes.Pan}></div>
                <div className={classes.Handle}></div>
            </div>
        <div className={classes.Shadow}></div>
    </div>
);

export default loader;