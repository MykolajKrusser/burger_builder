import React from 'react';
import Wrap from '../../hoc/Wrap';
import classes from './Layout.css'
const layout = (props) => (
    <Wrap>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Wrap>
);
export default layout;