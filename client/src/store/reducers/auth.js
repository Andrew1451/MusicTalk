import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: '',
    isLoggedIn: false,
    loading: false,
    redirectTo: '',
    error: null
}

const signupStart = (state, action) => {
    return {
        ...state,
        loading: true,
        redirectTo: '',
        error: null
    }
}

const signupFail = (state, action) => {
    return {
        ...state,
        loading: false,
        redirectTo: '',
        error: action.errorMessage
    }
}

const signupSuccess = (state, action) => {
    return {
        ...state,
        user: action.user,
        loading: false,
        isLoggedIn: true,
        redirectTo: '/profile',
        error: null
    }
}

const signinStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        redirectTo: ''
    }
}

const signinFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error,
    }
}

const signinSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        user: action.user,
        error: null,
        redirectTo: action.redirect,
        isLoggedIn: true
    }
}

const logout = (state, action) => {
    return {
        ...state,
        user: '',
        loading: false,
        isLoggedIn: false,
        redirectTo: '',
        error: null
    }
}

const login = (state, action) => {
    return {
        ...state,
        isLoggedIn: true,
        redirectTo: ''
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_START: return signupStart(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.SIGNIN_START: return signinStart(state, action);
        case actionTypes.SIGNIN_FAIL: return signinFail(state, action);
        case actionTypes.SIGNIN_SUCCESS: return signinSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return logout(state, action);
        case actionTypes.LOGIN: return login(state, action);
        default: return state;
    }
}

export default reducer;