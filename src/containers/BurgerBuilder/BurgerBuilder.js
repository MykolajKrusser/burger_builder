import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import Wrap from '../../hoc/Wrap/Wrap';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Ui/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/Ui/Loader/Loader';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component{
    state = {
        purchasing: false
    }

    componentDidMount(){
        console.log(this.props)
        this.props.onInitIngredients()
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
            return sum > 0;
    }
    
    purchasingHandler = ()=>{
        this.setState({purchasing: true})
    }

    modalClosedHandler = ()=>{
        this.setState({purchasing: false})
    }

    purchasContinueHandler = ()=>{
        // alert("You continue!")
        this.props.history.push('/checkout')
    }
    render(){
        const disableInfo ={
            ...this.props.ings
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null; 
        

        let burger = this.props.error ? <p style={{textAlign:"center", color:"red"}}>Ingredients can`t be loaded</p> : <Loader/>;
        
        
        if(this.props.ings){
            burger = (
                <Wrap>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredienAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable = {this.updatePurcgaseState(this.props.ings)}
                        price={this.props.prc}
                        purchasing={this.purchasingHandler}/>
                </Wrap>
            );
            orderSummary= <OrderSummery
                ingredients={this.props.ings}
                price={this.props.prc}
                purchasContinue={this.purchasContinueHandler}
                purchasCancel={this.modalClosedHandler}/>
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
        ings: state.ingredients,
        prc: state.totalprice,
        purchasable : state.purchasable,
        error: state.error
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: ()=> dispatch(burgerBuilderActions.initIngredients())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));