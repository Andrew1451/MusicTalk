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

const signupSuccess = (state, action) => {
    return {
        ...state,
        user: action.user,
        loading: false,
        isLoggedIn: true,
        error: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_START: return signupStart(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        default: return state;
    }
}

export default reducer;