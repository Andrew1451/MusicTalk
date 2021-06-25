import * as actionTypes from './actionTypes';
import axios from 'axios';

export const comment = (user, postid, comment) => {
    return dispatch => {
        axios.post(`/${user}/comment`, {postid, comment})
        .then(res => {
            dispatch(fetchComments(user, postid))
        })
        .catch(err => {
            dispatch(commentFail())
        })
    }
}

export const commentFail = () => {
    return {
        type: actionTypes.COMMENT_FAIL
    }
}

export const fetchComments = (user, postid) => {
    return dispatch => {
        axios.get(`/${user}/comments/${postid}`)
               //destructure response object to get data and call it comments
        .then( ({data: comments}) => {
            dispatch(fetchCommentsSuccess(postid, comments))
        })
        .catch(err => {
            dispatch(fetchCommentsFail())
        })
    }
}

export const fetchCommentsSuccess = (postid, comments) => {
    return {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        postid,
        comments
    }
}

export const fetchCommentsFail = () => {
    return {
        type: actionTypes.FETCH_COMMENTS_FAIL,
    }
}