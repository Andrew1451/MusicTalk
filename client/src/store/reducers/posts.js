import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allPosts: [],
    userPosts: [],
    postsError: null,
}

const allPostsSuccess = (state, action) => {
    return {
        ...state,
        allPosts: action.posts,
        postsError: null
    }
}

const allPostsFail = (state, action) => {
    return {
        ...state,
        allPosts: [],
        postsError: action.allPostsError
    }
}

//TODO: add userPosts

const likePostSuccess = (state, action) => {
    const posts = state.allPosts.map(post => {
        if (post.post_id === action.postid) {
            post['liked'] = true
            return post
        }
        return post
    })
    return {
        ...state,
        allPosts: posts
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALL_POSTS_SUCCESS: return allPostsSuccess(state, action);
        case actionTypes.ALL_POSTS_FAIL: return allPostsFail(state, action);
        case actionTypes.LIKE_POST_SUCCESS: return likePostSuccess(state, action);
        default: return state;
    }
}

export default reducer;