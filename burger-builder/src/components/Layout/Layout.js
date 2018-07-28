import React, {Component} from 'react';
import Wrap from '../../hoc/Wrap';
import classes from './Layout.css';
import Toolbar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
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
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
            <Toolbar drawerToggleClicked={this.drawerToggleHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Wrap>
        );
    }
}
export default Layout;