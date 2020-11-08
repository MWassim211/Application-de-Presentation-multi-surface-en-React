import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// eslint-disable-next-line import/no-cycle
import propagateSocket from '../middleware/socketMiddleware';
import rootReducer from '../reducers/index';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(propagateSocket),
));
export default store;
