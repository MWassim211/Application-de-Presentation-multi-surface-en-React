/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import io from 'socket.io-client';
import { SET_INDEX, setIndex } from '../actions/index';

const socket = io.connect('http://localhost:3000');
// eslint-disable-next-line import/prefer-default-export
export function propagateSocket(store) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here

      if (action.payload.btnurl) {
        if (action.type === SET_INDEX) {
          if (action.payload.btnurl === true) {
            console.log('hkemtha je vais emit');
            console.log(store.getState().index);
            socket.emit('action', { type: SET_INDEX, payload: { index: store.getState().index } });
            console.log('rahet');
          } else {
            console.log('rejected');
          }
        }
      }
      socket.on('action_response', (msg) => {
        console.log('action_response', msg);
        // eslint-disable-next-line default-case
        switch (msg.type) {
          case SET_INDEX:
            // store.dispatch(setIndex(msg.payload.index));
            console.log('teste');
            store.dispatch({
              type: SET_INDEX,
              payload:
                   { index: msg.payload.index.toString(), btnurl: false },
            });
            break;
        }
      });
      return next(action);
    };
  };
}
