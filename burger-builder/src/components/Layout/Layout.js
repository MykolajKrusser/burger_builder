import React from 'react';
import Wrap from '../../hoc/Wrap';
import classes from './Layout.css';
import Toolbar from '../Navigation/ToolBar/ToolBar'
const layout = (props) => (
    <Wrap>
        <Toolbar/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Wrap>
);
export default layout;