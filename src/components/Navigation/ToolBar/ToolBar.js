import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';

const toolbar = (props)=>(
    <header className={classes.ToolBar}>
        <SideDrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DeskTopOnly}>
            <NavigationItems
                isAuthenticated={props.isAuth}
            />
        </nav>
    </header>
);
export default toolbar;