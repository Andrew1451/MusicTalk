import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from './store/reducers/auth';
import postsReducer from './store/reducers/posts';
import commentsReducer from './store/reducers/comments';


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
let persistor = persistStore(store)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
