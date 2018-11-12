import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../Ui/BackDrop/Backdrop';
import Wrap from '../../../hoc/Wrap/Wrap';


const sideDrawer = (props)=>{
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Wrap>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems
                    isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Wrap>
    );
}
export default sideDrawer;