import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/Ui/Button/Button';

class ContactData extends Component{
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
    render(){
        return(
            <div className={classes.ContactData}>
                <h4>
                    Enter your Contact Data
                </h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;