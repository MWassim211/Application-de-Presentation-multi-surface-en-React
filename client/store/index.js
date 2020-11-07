import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { propagateSocket } from '../middleware/socketMiddleware';
import rootReducer from '../reducers/index';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(propagateSocket),
));
export default store;
