import React, {Component} from 'react';
import Wrap from '../../hoc/Wrap/Wrap';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Ui/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/Ui/Loader/Loader';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.99,
    bacon: 0.59,
    cheese: 0.79,
    meat: 1.39
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        purchasable: false,
        purchasing: false,
        totalPrice: 1.99,
        loading: false

    }

    updatePurcgaseState(ingradients){
        const sum = Object.keys(ingradients)
            .map(igKey =>{
                return ingradients[igKey]
            })
            .reduce((sum, el, index, array)=>{
                return sum + el
            }, 0)
            //console.log(sum)
            this.setState({purchasable: sum > 0})
    }
    
    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurcgaseState(updatedIngredients);
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurcgaseState(updatedIngredients);
    }

    purchasingHandler = ()=>{
        this.setState({purchasing: true})
    }

    modalClosedHandler = ()=>{
        this.setState({purchasing: false})
    }

    purchasContinueHandler = ()=>{
        //alert("You continue!")
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Nicolas',
                address: {
                    street: "street 1/a",
                    zipcode: "55-200",
                    country: "Poland"
                },
                email: "email@mail.com"
            },
            deliveryMethod: 'Fedex'
        }
        axios.post('/orders.json', order)
            .then(response=>{
                this.setState({loading: false, purchasing: false})
            })
            .catch(
                error => {this.setState({loading: false, purchasing: false})}
            )
    }
    render(){
        const disableInfo ={
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = <OrderSummery
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchasContinue={this.purchasContinueHandler}
            purchasCancel={this.modalClosedHandler}
            />
        if(this.state.loading){
            orderSummary = <Loader/>
        }
        return(
            <Wrap>
                <Modal show={this.state.purchasing} modalClosed={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredienAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable = {this.state.purchasable}
                    price={this.state.totalPrice}
                    purchasing={this.purchasingHandler}/>
            </Wrap>
        );
    }
}
export default BurgerBuilder;