import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './ContactData.css';
import Button from '../../../components/Ui/Button/Button';
import Loader from '../../../components/Ui/Loader/Loader';
import Input from '../../../components/Ui/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state={
        orderForm: {   
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },      
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest', //bug fixing
                valid: true
            }
        },
        formIsValid: false
    }
    
    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return true;
        }
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.minLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid
    }

    orderHandler = (event)=>{
        event.preventDefault();
        const formData = {}
        for (let i in this.state.orderForm){
            formData[i] = this.state.orderForm[i].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.prc,
            orderData: formData
        }
        this.props.purchaseBurger(order)
    }

    inputChangedHandler = (event, inputIdentifier)=>{
        //console.log(event.target.value)
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        //console.log(updatedOrderForm)
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})

    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],

            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map( formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event)=>this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
            );
        if (this.props.loading){
            form = <Loader/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>
                    Enter your Contact Data
                </h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        prc: state.totalprice,
        loading : state.loading
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger: (orderData)=> dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));