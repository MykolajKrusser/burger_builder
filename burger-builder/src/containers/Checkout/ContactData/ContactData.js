import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/Ui/Button/Button';
import Loader from '../../../components/Ui/Loader/Loader';

import axios from '../../../axios-orders';

class ContactData extends Component{
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({loading: false});
                this.props.history.push('/')
            })
            .catch(
                error => {this.setState({loading: false})}
            )
    }

    render(){
        let form = (<form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>);
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