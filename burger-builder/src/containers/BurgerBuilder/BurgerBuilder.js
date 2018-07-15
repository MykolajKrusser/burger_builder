import React, {Component} from 'react';
import Wrap from '../../hoc/Wrap';
import Burger from '../../components/Burger/Burger';
class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
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