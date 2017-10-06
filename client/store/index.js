import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import image from './image';
import galleries from './galleries';
import users from './users';
import paintings from './paintings';

const reducer = combineReducers({image, galleries, users, paintings});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));
const store = createStore(reducer, middleware);

export default store;
export * from './image';
export * from './galleries';
export * from './users';
export * from './paintings';
