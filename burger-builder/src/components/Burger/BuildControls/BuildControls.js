import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';


const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},
]

const buildControls = (props)=>(
    <div className={classes.BuildControls}>
        <p>Total price: <strong>{props.price.toFixed(2)}$</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={()=>props.ingredienAdded(ctrl.type)}
                removed={()=>props.ingredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.purchasing}>Buy Burger</button>
    </div>
)
export default buildControls;