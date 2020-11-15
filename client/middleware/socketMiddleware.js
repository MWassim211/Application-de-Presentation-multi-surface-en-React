import io from 'socket.io-client';
import {
  CREATE_POSTIT, SET_INDEX, NEXT_BOARD, PREVIOUS_BOARD, DELETE_POSTIT,
  DELETE_BOARD, ADD_DRAW_POINTS, CREATE_BOARD, RESET_DRAW_POINTS,
  setIndex, createPostit, createBoard, deletePostit, deleteBoard, nextBoard,
  previousBoard, addDrawPoints, resetDrawPoints,
} from '../actions/index';

// eslint-disable-next-line import/no-cycle
import store from '../store/index';

const socket = io.connect();

socket.on('action_response', (msg) => {
  switch (msg.type) {
    case SET_INDEX:
      store.dispatch(setIndex({ index: msg.payload.index.toString() }, { propagate: false }));
      break;
    case CREATE_POSTIT:
      store.dispatch(createPostit(msg.payload, { propagate: false }));
      break;
    case NEXT_BOARD:
      store.dispatch(nextBoard(msg.payload, { propagate: false }));
      break;
    case PREVIOUS_BOARD:
      store.dispatch(previousBoard(msg.payload, { propagate: false }));
      break;
    case DELETE_POSTIT:
      store.dispatch(deletePostit(msg.payload, { propagate: false }));
      break;
    case DELETE_BOARD:
      store.dispatch(deleteBoard(msg.payload, { propagate: false }));
      break;
    case CREATE_BOARD:
      store.dispatch(createBoard(msg.payload, { propagate: false }));
      break;
    case ADD_DRAW_POINTS:
      store.dispatch(addDrawPoints(msg.payload, { propagate: false }));
      break;
    case RESET_DRAW_POINTS:
      store.dispatch(resetDrawPoints(msg.payload, { propagate: false }));
      break;
    default:
      break;
  }
});
function propagateSocket() {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here

      if (action.meta.propagate === true) {
        if (action.type === SET_INDEX) {
          socket.emit('action', { type: SET_INDEX, payload: { index: store.getState().index } });
        }
        if (action.type === CREATE_POSTIT) {
          socket.emit('action', { type: CREATE_POSTIT, payload: action.payload });
        }
        if (action.type === NEXT_BOARD) {
          socket.emit('action', { type: NEXT_BOARD, payload: action.payload });
        }
        if (action.type === PREVIOUS_BOARD) {
          socket.emit('action', { type: PREVIOUS_BOARD, payload: action.payload });
        }
        if (action.type === DELETE_POSTIT) {
          socket.emit('action', { type: DELETE_POSTIT, payload: action.payload });
        }
        if (action.type === DELETE_BOARD) {
          socket.emit('action', { type: DELETE_BOARD, payload: action.payload });
        }
        if (action.type === CREATE_BOARD) {
          socket.emit('action', { type: CREATE_BOARD, payload: action.payload });
        }
        if (action.type === ADD_DRAW_POINTS) {
          socket.emit('action', { type: ADD_DRAW_POINTS, payload: action.payload });
        }
        if (action.type === RESET_DRAW_POINTS) {
          socket.emit('action', { type: RESET_DRAW_POINTS, payload: action.payload });
        }
      }

      return next(action);
    };
  };
}
export default propagateSocket;
