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

export const signupSuccess = (username, redirect) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        user: username,
        redirect
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const signup = (username, password) => {
    return dispatch => {
        dispatch(signupStart());
        axios.post('/sign-up', {
            username: username,
            password: password
        }).then(res => {
            let errorMessage = '';
            if (res.data.error) {
                errorMessage = 'Sorry, something went wrong :('
                if (res.data.error.code === 'ER_DUP_ENTRY') {
                    errorMessage = 'Username already exists';
                }
                dispatch(signupFail(errorMessage));
            }
            if (res.data.username) {
                dispatch(signupSuccess(res.data.username, '/profile'));
            }
        }).catch(error => {
            console.log(error)
            dispatch(signupFail('An error occured'));
        })
    }
}