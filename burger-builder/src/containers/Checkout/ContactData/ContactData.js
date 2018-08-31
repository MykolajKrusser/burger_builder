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
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
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

    render(){
        let form = (
            <form>
                <Input elementType="..." elementConfig="..." value=".."/>
                <Input inputtype='input' type="email" name="email" placeholder="Your Email"/>
                <Input inputtype='input' type="text" name="street" placeholder="Your street"/>
                <Input inputtype='input' type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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