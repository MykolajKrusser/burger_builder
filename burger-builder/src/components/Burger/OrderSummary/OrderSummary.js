import React, {Component} from 'react';
import Wrap from '../../../hoc/Wrap';
import Button from '../../Ui/Button/Button';

class OrderSammary extends Component {
    // this component cold be a fuctional, does not have be a class
    componentWillUpdate(){
        console.log("WillUPdete component odred summary!!")
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return (
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            );
        })
        return(
            <Wrap>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Price: <strong>{this.props.price.toFixed(2)}</strong>$</p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchasCancel}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchasContinue}>Continue</Button>
            </Wrap>
        );
    }
    
    
};

export default OrderSammary;