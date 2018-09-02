import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/Ui/Button/Button';
import Loader from '../../../components/Ui/Loader/Loader';
import Input from '../../../components/Ui/Input/Input';
import axios from '../../../axios-orders';

class ContactData extends Component{
    state={
        orderForm: {   
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },      
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading: true})
        const formData = {}
        for (let i in this.state.orderForm){
            formData[i] = this.state.orderForm[i].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response=>{
                this.setState({loading: false});
                this.props.history.push('/')
            })
            .catch(
                error => {this.setState({loading: false})}
            )
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
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm})

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
                        />
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
            );
        if (this.state.loading){
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

export default ContactData;