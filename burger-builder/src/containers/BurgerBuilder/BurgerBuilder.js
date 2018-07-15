import React, {Component} from 'react';
import Wrap from '../../hoc/Wrap';
import Burger from '../../components/Burger/Burger';
class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    render(){
        return(
            <Wrap>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Wrap>
        );
    }
}
export default BurgerBuilder;