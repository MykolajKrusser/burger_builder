import React from 'react';
import Wrap from '../../../hoc/Wrap';
import Button from '../../Ui/Button/Button';

const orderSammary = (props)=>{
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey =>{
            return (
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
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
            <p>Price: <strong>{props.price.toFixed(2)}</strong>$</p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchasCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchasContinue}>Continue</Button>
        </Wrap>
    );
    
};

export default orderSammary;