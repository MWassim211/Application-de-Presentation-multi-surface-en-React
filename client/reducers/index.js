/* eslint-disable */
import {
  DELETE_POSTIT, CREATE_BOARD, DELETE_BOARD, CREATE_POSTIT, NEXT_BOARD, PREVIOUS_BOARD, SET_INDEX
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
        board: '2',
        title: 'TP 42',
        text: 'Le TP 4',
        visible: true,
        color: '#0E0',
      }],
    },
  ],
}

function rootReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case CREATE_POSTIT:{
      // const indexBoard = action.payload.idBoard - 1
      const indexBoard = state.boards.findIndex((e)=>e.id == action.payload.idBoard)
      const newpostit = {
        type: 'postit',
        board: action.payload.idBoard.toString(),
        title: action.payload.title,
        text: action.payload.desc,
        visible: true,
        color: '#0E0',
      }
      const res = {
        ...state,
        boards : [
          ...state.boards.slice(0,indexBoard),
          {
            ...state.boards[indexBoard],
            postits : [
              ...state.boards[indexBoard].postits,
              newpostit,
            ]
          },
          ...state.boards.slice(indexBoard+1)
        ]
      }
      console.log(res)
      return res;
    }
      
    case DELETE_POSTIT: {
      const indexBoard = state.boards.findIndex((e)=>e.id == action.payload.id)
      const newpostitis = state.boards[indexBoard].postits.filter((postit) => postit.title !== action.payload.title);
      const index = action.payload.id-1;
      const res = {
        ...state,
        boards : [
          ...state.boards.slice(0,indexBoard),
          {
            ...state.boards[indexBoard],
            postits : newpostitis
          },
          ...state.boards.slice(indexBoard+1)
        ],
      }
      console.log(res)
      return res;
    }
    case CREATE_BOARD:{
      let max = 0;
      state.boards.forEach(e => {
      if (parseInt(e.id) > max) {
        max = parseInt(e.id)
      }
    });
      const index = max+1;
      const newBoard = {
        type: 'board',
        id: index.toString(),
        title: action.payload.title,
        active: false,
        notes: '',
        postits: [],
      }
      const res =  {
        ...state,
        boards : [
          ...state.boards,
          newBoard,
        ]
      }
      console.log(res)
      return res;
    }
      
    case DELETE_BOARD:{
      const indexElem = state.boards.findIndex((e)=>e.id == action.payload.id)
      // const index = parseInt(action.payload.id)-1;
      const res = {
        ...state,
        index : state.boards[0].id,
        boards : [
          ...state.boards.slice(0,indexElem),
          ...state.boards.slice(indexElem+1)
        ]
      }
      console.log(res)
      return res;
    }
      
    case NEXT_BOARD: {
      console.log(action);
      const maxBoards = state.boards.length;
      console.log(maxBoards)
      let next;
      const currentBoardIndex = state.boards.findIndex(e=>e.id == state.index.toString());
      (currentBoardIndex == -1 || currentBoardIndex == maxBoards - 1 ) ? next = 0 : next = currentBoardIndex +1;
      const res = {
        ...state,
        index : parseInt(state.boards[next].id),
      }
      console.log(res);
      return res;
    }
    case PREVIOUS_BOARD:{
      console.log(action);
      const maxBoards = state.boards.length;
      console.log(maxBoards)
      let next;
      const currentBoardIndex = state.boards.findIndex(e=>e.id == state.index.toString());
      (currentBoardIndex == -1 || currentBoardIndex == 0 ) ? next = maxBoards - 1 : next = currentBoardIndex - 1;
      const res = {
        ...state,
        index : parseInt(state.boards[next].id),
      }
      console.log(res);
      return res;
    }
    case SET_INDEX: {
      console.log(action)
      const indexElem = state.boards.findIndex((e)=>e.id === action.payload.index)
      if(indexElem == -1)
        return;
      const res = {
        ...state,
        // index : indexElem + 1,
        index : parseInt(state.boards[indexElem].id),
      }
      console.log(res)
      return res;
    }
    default:
      return state;
  }
  return state;
}

export default rootReducer;
