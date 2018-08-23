import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state={
        ingredients:{
            bacon: 1,
            salad: 1,
            cheese: 1,
            meat: 1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()){
            // ["salad", "1"]
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredients})
    }

    checkoutCancelHandler = ()=>{
        this.props.history.goBack()
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
            </div>
        );
    }
}

export default Checkout;