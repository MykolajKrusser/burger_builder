import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../Logo/Logo';
const toolbar = (props)=>(
    <header className={classes.ToolBar}>
        <div>MENU</div>
        <Logo/>
        <nav>
            <ul>
               ....
            </ul>
        </nav>
    </header>
);
export default toolbar;