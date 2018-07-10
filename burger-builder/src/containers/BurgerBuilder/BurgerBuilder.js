import React, {Component} from 'react';
import Wrap from '../../hoc/Wrap';
class BurgerBuilder extends Component{
    render(){
        return(
            <Wrap>
                <div>Burger</div>
                <div>Build Controls</div>
            </Wrap>
        );
    }
}
export default BurgerBuilder;