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

export const signinStart = () => {
    return {
        type: actionTypes.SIGNIN_START
    }
}

export const signinFail = (error) => {
    return {
        type: actionTypes.SIGNIN_FAIL,
        error: error
    }
}

export const signinSuccess = (username, redirect) => {
    return {
        type: actionTypes.SIGNIN_SUCCESS,
        user: username,
        redirect
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const login = () => {
    return {
        type: actionTypes.LOGIN
    }
}

export const signin = (username, password) => {
    console.log(username)
    console.log(password)
    return dispatch => {
        dispatch(signinStart());
        axios.post('/signin', {username, password})
        .then(res => {
            if (res.data.err) {
                dispatch(signinFail(res.data.err));
            }
            if (res.data.username) {
                dispatch(signinSuccess(res.data.username, '/profile'));
            }
        })
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