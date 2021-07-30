import { createStore, applyMiddleware, compose } from 'redux';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import rootReducer from './reducer'

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = () => createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;