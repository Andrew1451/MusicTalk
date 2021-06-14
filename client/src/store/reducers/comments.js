import * as actionTypes from '../actions/actionTypes'

const initialState = {
    comments: [],
    commentError: null
}

const commentSuccess = (state, action) => {
    return {
        ...state,
        commentError: null,
        comments: [action.comment, ...state.comments]
    }
}

const commentFail = (state, action) => {
    return {
        ...state,
        commentError: 'Could not save comment :(',
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMMENT_SUCCESS: return commentSuccess(state, action);
        case actionTypes.COMMENT_FAIL: return commentFail(state, action);
        default: return state
    }
}

export default reducer;