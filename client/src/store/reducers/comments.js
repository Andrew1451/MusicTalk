import * as actionTypes from '../actions/actionTypes'

const initialState = {
    comments: [],
    commentError: null,
    fetchCommentsError: null
}

const commentFail = (state, action) => {
    return {
        ...state,
        commentError: 'Could not save comment :(',
    }
}

const fetchCommentsSuccess = (state, action) => {
    const fetchedComments = {postid: action.postid, comments: action.comments}
    const updatedComments = state.comments.filter(c => c.postid !== fetchedComments.postid)
    updatedComments.push(fetchedComments)
    return {
        ...state,
        comments: updatedComments,
        commentError: null,
        fetchCommentsError: null,
    }
}

const fetchCommentsFail = (state, action) => {
    return {
        ...state,
        comments: [],
        commentError: null,
        fetchCommentsError: `Couldn't grab comments :(`,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMMENT_FAIL: return commentFail(state, action);
        case actionTypes.FETCH_COMMENTS_SUCCESS: return fetchCommentsSuccess(state, action);
        case actionTypes.FETCH_COMMENTS_FAIL: return fetchCommentsFail(state, action);
        default: return state
    }
}

export default reducer;