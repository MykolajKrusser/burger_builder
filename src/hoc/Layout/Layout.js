import React, {Component} from 'react';
import {connect} from 'react-redux';
import Wrap from '../Wrap/Wrap';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = ()=>{
        this.setState({showSideDrawer: false})
    }

    drawerToggleHandler = ()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render(){
        return (
         <Wrap>
            <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerCloseHandler}
                isAuth={this.props.isAuthenticated}/>
            <Toolbar
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.drawerToggleHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Wrap>
        );
    }
}

const mapStateToProps = state =>{
    return {
        isAuthenticated : state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);