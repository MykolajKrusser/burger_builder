import React from 'react';
import Wrap from '../../../hoc/Wrap';

const orderSammary = (props)=>{
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey =>{
            return (
                <li>
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
            <button>Continue to Checkout?</button>
        </Wrap>
    );
    
};

export default orderSammary;