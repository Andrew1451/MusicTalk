import { combineReducers } from 'redux';
import authReducer from './store/reducers/auth';
import postsReducer from './store/reducers/posts';
import commentsReducer from './store/reducers/comments';

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer
  })

  export default rootReducer