import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: '',
    isLoggedIn: false,
    loading: false,
    error: null
}

const signupStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}

const signupFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.errorMessage
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_START: return signupStart(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        default: return state;
    }
}

export default reducer;