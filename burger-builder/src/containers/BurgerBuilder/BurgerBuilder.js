import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionsType from '../../store/actions';
import Wrap from '../../hoc/Wrap/Wrap';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Ui/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/Ui/Loader/Loader';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.99,
    bacon: 0.59,
    cheese: 0.79,
    meat: 1.39
}

class BurgerBuilder extends Component{
    state = {
        purchasable: false,
        purchasing: false,
        totalPrice: 1.99,
        loading: false,
        error: false
    }

    componentDidMount(){
        //console.log(this.props)
    //   axios.get('https://burger-app-4c52d.firebaseio.com/ingredients.json')
    //     .then(respons=>{
    //         this.setState({ingredients: respons.data})
    //     })
    //     .catch(error=>{
    //         this.setState({error: true})
    //     });
    }

    updatePurcgaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
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
        // alert("You continue!")
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryParamsString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParamsString
        })
    }
    render(){
        const disableInfo ={
            ...this.props.ings
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null; 
        

        let burger = this.state.error ? <p style={{textAlign:"center", color:"red"}}>Ingredients can`t be loaded</p> : <Loader/>;
        
        
        if(this.props.ings){
            burger = (
                <Wrap>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredienAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable = {this.state.purchasable}
                        price={this.state.totalPrice}
                        purchasing={this.purchasingHandler}/>
                </Wrap>
            );
            orderSummary= <OrderSummery
                ingredients={this.props.ings}
                price={this.state.totalPrice}
                purchasContinue={this.purchasContinueHandler}
                purchasCancel={this.modalClosedHandler}/>
        }

        if(this.state.loading){
            orderSummary = <Loader/>
        }

        return(
            <Wrap>
                <Modal show={this.state.purchasing} modalClosed={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Wrap>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.ingredients
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName)=> dispatch({type: actionsType.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName)=> dispatch({type: actionsType.REEMOVE_INGREDIENT, ingredientName: ingName})
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));