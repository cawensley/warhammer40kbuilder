import { createStore } from 'redux';
import combineReducers from './reducers/combinedReducers';

const store = createStore(combineReducers);

export default store;
