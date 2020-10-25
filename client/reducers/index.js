/* eslint-disable */
import {
  DELETE_POSTIT, CREATE_BOARD, DELETE_BOARD, CREATE_POSTIT, NEXT_BOARD, PREVIOUS_BOARD,
} from '../actions/index';
/* eslint-disable no-unreachable */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const initialState = {
  index: 1,
  boards: [
    {
      type: 'board',
      id: '1',
      title: 'TIW 8',
      active: true,
      notes: '',
      postits: [
        {
          type: 'postit',
          board: '1',
          title: 'TP 1',
          text: 'Le TP porte sur des rappels de developpement Web',
          visible: false,
          color: '#CCC',
        },
        {
          type: 'postit',
          board: '1',
          title: 'TP 2',
          text: "Le TP porte sur la creation d'un outil de presentation HTML",
          visible: true,
          color: '#00E',
        },
        {
          type: 'postit',
          board: '1',
          title: 'TP 3',
          text: 'Le TP 3',
          visible: true,
          color: '#00E',
        },
        {
          type: 'postit',
          board: '1',
          title: 'TP 4',
          text: 'Le TP 4',
          visible: true,
          color: '#0E0',
        },
      ],
    },
    {
      type: 'board',
      id: '2',
      title: 'Courses',
      active: false,
      notes: '',
      postits: [{
        type: 'postit',
        board: '1',
        title: 'TP 42',
        text: 'Le TP 4',
        visible: true,
        color: '#0E0',
      }],
    },
  ],
};

function rootReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case CREATE_POSTIT:
      return;
    case DELETE_POSTIT: {
      const newpostitis = state.boards[parseInt(action.payload.id)-1].postits.filter((postit) => postit.title !== action.payload.title);
      const index = action.payload.id-1;
      const res = {
        ...state,
        boards : [
          ...state.boards.slice(0,index),
          {
            ...state.boards[index],
            postits : newpostitis
          },
          ...state.boards.slice(index+1)
        ],
      }
      console.log(res)
      return res;
    }
    case CREATE_BOARD:
      return;
    case DELETE_BOARD:
      return;
    case NEXT_BOARD:
      return;
    case PREVIOUS_BOARD:
      return;
    default:
      return state;
  }
  return state;
}

export default rootReducer;
