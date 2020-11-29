import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}

export const signupFail = () => {
    return {
        type: actionTypes.SIGNUP_FAIL
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
        axios.post('/signup', {
            username: username,
            password: password
        }).then(response => {
            console.log(response);
            dispatch(signupSuccess());
        }).catch(error => {
            console.log(error);
            dispatch(signupFail());
        })
    }
}