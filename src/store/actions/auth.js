import * as actionType from './actionTypes';
import axios from 'axios';

export const authStart = ()=>{
    return {
        type: actionType.AUTH_START
    };
};

export const authSuccess = (authData)=>{
    return {
        type: actionType.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error)=>{
    return {
        type: actionType.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDMDNeI12gSzVR0vJvBe-hYsfO357ap2V0';
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDMDNeI12gSzVR0vJvBe-hYsfO357ap2V0';
        }
        axios.post(url, authData)
            .then( response =>{
                console.log(response);
                dispatch(authSuccess(response.data))
            })
            .catch(err=>{
                console.log(err)
                dispatch(authFail(err))
            });
    };
};