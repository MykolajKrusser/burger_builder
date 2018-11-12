import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/validation';

import Input from '../../components/Ui/Input/Input';
import Button from '../../components/Ui/Button/Button';
import Loader from '../../components/Ui/Loader/Loader';

import classes from './Auth.css';
import * as actions from '../../store/actions/index';


class Auth extends Component {
    state={
        controls: {
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSingup: true
    };

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls})
    }

    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSingup);
    }

    switchAuthModHandler = ()=>{
        this.setState(prevState =>{
            return {isSingup: !prevState.isSingup}
        })
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],

            });
        };

        let form = formElementsArray.map(
            formElement=>(
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
            )
        );

        if(this.props.loading){
            form = <Loader/>;
        };

        let errorMessege = null;

        if(this.props.error){
            errorMessege = (
                <p>{this.props.error.message}</p>
            );
        };

        return(
            <div className={classes.Auth}>
                {this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath}/> : null}
                {errorMessege}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                    
                </form>
                <Button 
                    clicked = {this.switchAuthModHandler}
                    btnType='Danger'>SWITCH TO {this.state.isSingup ? 'SIGNIN' : 'SINGUP'}</Button>
            </div>
        );
    };
};

const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated : state.auth.token !== null,
        buildingBurger : state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSingup)=>dispatch(actions.auth(email, password, isSingup)),
        onSetRedirectPath: ()=>dispatch(actions.setAuthRedirectPath('/'))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);