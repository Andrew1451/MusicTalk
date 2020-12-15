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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_START: return signupStart(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return logout(state, action);
        default: return state;
    }
}

export default reducer;