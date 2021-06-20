import * as actionTypes from '../actions/actionTypes'

const initialState = {
    comments: [],
    commentError: null,
    fetchCommentsError: null,
    showComments: false
}

const commentSuccess = (state, action) => {
    return {
        ...state,
        commentError: null,
        fetchCommentsError: null,
        comments: [action.comment, ...state.comments],
        showComments: true,
    }
}

const commentFail = (state, action) => {
    return {
        ...state,
        commentError: 'Could not save comment :(',
    }
}

const fetchCommentsSuccess = (state, action) => {
    return {
        ...state,
        comments: action.comments,
        commentError: null,
        fetchCommentsError: null,
        showComments: true
    }
}

const fetchCommentsFail = (state, action) => {
    return {
        ...state,
        comments: [],
        commentError: null,
        fetchCommentsError: `Couldn't grab comments :(`,
        showComments: true  //set to true to show error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMMENT_SUCCESS: return commentSuccess(state, action);
        case actionTypes.COMMENT_FAIL: return commentFail(state, action);
        case actionTypes.FETCH_COMMENTS_SUCCESS: return fetchCommentsSuccess(state, action);
        case actionTypes.FETCH_COMMENTS_FAIL: return fetchCommentsFail(state, action);
        default: return state
    }
}

export default reducer;