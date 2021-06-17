import * as actionTypes from './actionTypes';
import axios from 'axios';

export const comment = (user, comment, postid) => {
    return dispatch => {
        axios.post(`/${user}/comment`, {comment, postid})
        .then(res => {
            console.log(res)
            dispatch(commentSuccess(comment))
        })
        .catch(err => {
            console.log(err)
            dispatch(commentFail())
        })
    }
}

export const commentSuccess = comment => {
    return {
        type: actionTypes.COMMENT_SUCCESS,
        comment
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
        .then(res => {
            //todo: parse comments
            let comments;
            dispatch(fetchCommentsSuccess(comments))
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchCommentsFail())
        })
    }
}

export const fetchCommentsSuccess = comments => {
    return {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        comments
    }
}

export const fetchCommentsFail = () => {
    return {
        type: actionTypes.FETCH_COMMENTS_FAIL,
    }
}