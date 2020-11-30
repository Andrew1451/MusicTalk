import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}

export const signupFail = (errorMessage) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        errorMessage: errorMessage
    }
}

export const signupSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS
    }
}

export const signup = (username, password) => {
    return dispatch => {
        dispatch(signupStart());
        axios.post('/sign-up', {
            username: username,
            password: password
        }).then(response => {
            dispatch(signupSuccess(response.data.username));
        }).catch(error => {
            console.log(error);
            dispatch(signupFail());
        })
    }
}