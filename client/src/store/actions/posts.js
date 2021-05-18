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

export const likePostFail = postid => {
    return {
        type: actionTypes.LIKE_POST_FAIL,
        postid
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const likePost = (user, postid) => {
    return dispatch => {
        axios.post(`/${user}/like`, {postId: postid})
        .then(res => {
            if (res.data.liked) {
                dispatch(likePostSuccess(postid))
            }
        })
        .catch(err => {
            dispatch(likePostFail(postid))
        })
    }
}

export const submitPostSuccess = addedPost => {
    return {
        type: actionTypes.SUBMIT_POST_SUCCESS,
        addedPost
    }
}

export const submitPostFail = error => {
    return {
        type: actionTypes.SUBMIT_POST_FAIL,
        error
    }
}

export const userPostsSuccess = posts => {
    return {
        type: actionTypes.USER_POSTS_SUCCESS,
        posts
    }
}

export const userPostsFail = () => {
    return {
        type: actionTypes.USER_POSTS_FAIL
    }
}

export const fetchAllPosts = user => {
    return dispatch => {
        axios.get(`/${user}/all-posts`)
        .then(res => {
            if (res.data.allPosts) {
                let posts = [];
                res.data.allPosts.forEach(post => posts.push(post));
                dispatch(allPostsSuccess(posts));
            }
        })
        .catch(err => {
            dispatch(allPostsFail(`Had trouble grabbing posts =/`))
        })
    }
}

export const fetchUserPosts = user => {
    return dispatch => {
        axios.get(`/${user}/posts`)
        .then(res => {
            let postsArray = [];
            res.data.posts.forEach(post => {
                postsArray.push(post)
            });
            dispatch(userPostsSuccess(postsArray))
        })
        .catch(err => dispatch(userPostsFail()))
    }
}

export const submitPost = (user, post) => {
    return dispatch => {
        axios.post(`/${user}/add-post`, {post})
        .then(res => {
            if (res.data.result) {
                const addedPost = { post: post, post_id: res.data.result.insertId, username: user, liked: false }
                dispatch(submitPostSuccess(addedPost))
            }
        })
        .catch(err => dispatch(submitPostFail(`Couldn't submit post =/`)));
    }
}