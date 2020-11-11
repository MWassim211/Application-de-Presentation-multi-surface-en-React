/* eslint-disable */
/* eslint-disable no-undef */
import { Create } from '@material-ui/icons';
import io from 'socket.io-client';
import { CREATE_POSTIT, SET_INDEX , NEXT_BOARD , PREVIOUS_BOARD , DELETE_POSTIT ,
   DELETE_BOARD ,ADD_DRAW_POINTS, CREATE_BOARD, RESET_DRAW_POINTS} from '../actions/index';
// eslint-disable-next-line import/named
// eslint-disable-next-line import/no-cycle
import { setIndex, createPostit, createBoard , deletePostit, deleteBoard, nextBoard , previousBoard ,addDrawPoints, resetDrawPoints } from '../actions/index';
import store from '../store/index';



const socket = io.connect('http://localhost:3000');

socket.on('action_response', (msg) => {
  console.log('action_response', msg);
  // eslint-disable-next-line default-case
  switch (msg.type) {
    case SET_INDEX:
      console.log('teste');
      store.dispatch(setIndex({index : msg.payload.index.toString()},{propagate : false}));
      break;
    case CREATE_POSTIT:
      console.log('hnnnnnnnnnnnna')
      console.log(msg.payload)
      store.dispatch(createPostit(msg.payload,{propagate : false}))
      break;
    case NEXT_BOARD:
      store.dispatch(nextBoard(msg.payload,{propagate : false}))
      break;
    case PREVIOUS_BOARD:
      store.dispatch(previousBoard(msg.payload,{propagate : false}))
      break;
    case DELETE_POSTIT : 
      store.dispatch(deletePostit(msg.payload,{ propagate : false}))
      break;
    case DELETE_BOARD : 
      store.dispatch(deleteBoard(msg.payload,{ propagate : false}))
      break;
    case CREATE_BOARD : 
      store.dispatch(createBoard(msg.payload,{ propagate : false}))
      break;
    case ADD_DRAW_POINTS : 
      store.dispatch(addDrawPoints(msg.payload,{ propagate : false}))
      break;
    case RESET_DRAW_POINTS : 
      store.dispatch(resetDrawPoints(msg.payload,{ propagate : false}))
      break;


    
    
  }
});
// eslint-disable-next-line import/prefer-default-export
function propagateSocket(store) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here

      if (action.meta.propagate===true) {
        if (action.type === SET_INDEX) {
            console.log('hkemtha je vais emit');
            console.log(store.getState().index);
            console.log('verifyib store ' + store.getState().index)
            socket.emit('action', { type: SET_INDEX, payload: { index: store.getState().index } });
            console.log('rahet');
        }
        if (action.type === CREATE_POSTIT) {
          // socket.emit('action', { type: CREATE_POSTIT, payload : {desc : action.payload.desc, title : action.payload.title , idBoard : action.payload.idBoard} });
          socket.emit('action', { type: CREATE_POSTIT, payload : action.payload });
        }
        if (action.type === NEXT_BOARD) {
          // socket.emit('action', { type: CREATE_POSTIT, payload : {desc : action.payload.desc, title : action.payload.title , idBoard : action.payload.idBoard} });
          socket.emit('action', { type: NEXT_BOARD, payload : action.payload });
        }
        if (action.type === PREVIOUS_BOARD) {
          // socket.emit('action', { type: CREATE_POSTIT, payload : {desc : action.payload.desc, title : action.payload.title , idBoard : action.payload.idBoard} });
          socket.emit('action', { type: PREVIOUS_BOARD, payload : action.payload });
        }
        if (action.type === DELETE_POSTIT) {
          // socket.emit('action', { type: CREATE_POSTIT, payload : {desc : action.payload.desc, title : action.payload.title , idBoard : action.payload.idBoard} });
          socket.emit('action', { type: DELETE_POSTIT, payload : action.payload });
        }
        if (action.type === DELETE_BOARD) {
          // socket.emit('action', { type: CREATE_POSTIT, payload : {desc : action.payload.desc, title : action.payload.title , idBoard : action.payload.idBoard} });
          socket.emit('action', { type: DELETE_BOARD, payload : action.payload });
        }
        if (action.type === CREATE_BOARD) {
          // socket.emit('action', { type: CREATE_POSTIT, payload : {desc : action.payload.desc, title : action.payload.title , idBoard : action.payload.idBoard} });
          socket.emit('action', { type: CREATE_BOARD, payload : action.payload });
        }
        if (action.type === ADD_DRAW_POINTS) {
          // socket.emit('action', { type: CREATE_POSTIT, payload : {desc : action.payload.desc, title : action.payload.title , idBoard : action.payload.idBoard} });
          socket.emit('action', { type: ADD_DRAW_POINTS, payload : action.payload });
        }
        if (action.type === RESET_DRAW_POINTS) {
          // socket.emit('action', { type: CREATE_POSTIT, payload : {desc : action.payload.desc, title : action.payload.title , idBoard : action.payload.idBoard} });
          socket.emit('action', { type: RESET_DRAW_POINTS, payload : action.payload });
        }

        
      }

      return next(action);
    };
  };
}
 export  default propagateSocket;