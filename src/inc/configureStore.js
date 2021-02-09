import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root';

const Store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  ),
);
export default Store;
