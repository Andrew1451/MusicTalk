import * as actionTypes from './actionTypes'
import axios from 'axios';

export const allPostsSuccess = posts => {
    return {
        type: actionTypes.ALL_POSTS_SUCCESS,
        posts: posts
    }
}

export const allPostsFail = errorMessage => {
    return {
        type: actionTypes.ALL_POSTS_FAIL,
        allPostsError: errorMessage
    }
}

export const likePostSuccess = postid => {
    return {
        type: actionTypes.LIKE_POST_SUCCESS,
        postid
    }
}

export const likePost = (user, postid) => {
    return dispatch => {
        axios.post(`/${user}/like`, {postId: postid})
        .then(res => {
            dispatch(likePostSuccess(postid))
        })
        .catch(err => console.log(err))
    }
}

export const fetchAllPosts = user => {
    return dispatch => {
        axios.get(`/${user}/all-posts`)
        .then(res => {
            let posts = [];
            res.data.allPosts.forEach(post => posts.push(post));
            dispatch(allPostsSuccess(posts));
        })
        .catch(err => {
            dispatch(allPostsFail(`Had trouble grabbing posts =/`))
        })
    }
}