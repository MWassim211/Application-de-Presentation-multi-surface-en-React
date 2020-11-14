import {
  DELETE_POSTIT, CREATE_BOARD, DELETE_BOARD, CREATE_POSTIT, NEXT_BOARD, PREVIOUS_BOARD, SET_INDEX,
  PREVIOUS_POSTIT, NEXT_POSTIT, ADD_DRAW_POINTS, RESET_DRAW_POINTS,
} from '../actions/index';

const initialState = {
  index: 1,
  currentPostit: '1',
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
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
          },
        },
        {
          type: 'postit',
          board: '1',
          title: 'TP 2',
          text: "Le TP porte sur la creation d'un outil de presentation HTML",
          visible: true,
          color: '#00E',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
          },
        },
        {
          type: 'postit',
          board: '1',
          title: 'TP 3',
          text: 'Le TP 3',
          visible: true,
          color: '#00E',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
          },
        },
        {
          type: 'postit',
          board: '1',
          title: 'TP 4',
          text: 'Le TP 4',
          visible: true,
          color: '#0E0',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
          },
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
        drawing: {
          clickX: [],
          clickY: [],
          clickDrag: [],
        },
      }],
    },
  ],
};

function rootReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case CREATE_POSTIT: {
      const indexBoard = state.boards.findIndex((e) => e.id === action.payload.idBoard.toString());
      const newpostit = {
        type: 'postit',
        board: action.payload.idBoard.toString(),
        title: action.payload.title,
        text: action.payload.desc,
        visible: true,
        color: '#0E0',
        drawing: {
          clickX: [],
          clickY: [],
          clickDrag: [],
        },
      };
      const res = {
        ...state,
        boards: [
          ...state.boards.slice(0, indexBoard),
          {
            ...state.boards[indexBoard],
            postits: [
              ...state.boards[indexBoard].postits,
              newpostit,
            ],
          },
          ...state.boards.slice(indexBoard + 1),
        ],
      };
      return res;
    }

    case DELETE_POSTIT: {
      const indexBoard = state.boards.findIndex((e) => e.id === action.payload.id);
      const newpostitis = state.boards[indexBoard].postits
        .filter((postit) => postit.title !== action.payload.title);
      // const index = action.payload.id - 1;
      const res = {
        ...state,
        boards: [
          ...state.boards.slice(0, indexBoard),
          {
            ...state.boards[indexBoard],
            postits: newpostitis,
          },
          ...state.boards.slice(indexBoard + 1),
        ],
      };
      return res;
    }
    case CREATE_BOARD: {
      let max = 0;
      state.boards.forEach((e) => {
        if (parseInt(e.id, 10) > max) {
          max = parseInt(e.id, 10);
        }
      });
      const index = max + 1;
      const newBoard = {
        type: 'board',
        id: index.toString(),
        title: action.payload.title,
        active: false,
        notes: '',
        postits: [],
      };
      const res = {
        ...state,
        index,
        boards: [
          ...state.boards,
          newBoard,
        ],
      };
      return res;
    }

    case DELETE_BOARD: {
      const indexElem = state.boards.findIndex((e) => e.id === action.payload.id);
      const boardslength = state.boards.length;
      let pointe;
      if (boardslength - 1 > indexElem) { pointe = indexElem + 2; } else { pointe = 1; }
      // state.boards.length > 0 ? pointe = parseInt(state.boards[0].id) : pointe = 1
      const res = {
        ...state,
        index: pointe,
        boards: [
          ...state.boards.slice(0, indexElem),
          ...state.boards.slice(indexElem + 1),
        ],
      };
      return res;
    }

    case NEXT_BOARD: {
      const maxBoards = state.boards.length;
      let next;
      const currentBoardIndex = state.boards.findIndex((e) => e.id === state.index.toString());
      if (currentBoardIndex === -1) { return state; }
      if (currentBoardIndex === maxBoards - 1) { next = 0; } else { next = currentBoardIndex + 1; }
      const res = {
        ...state,
        index: parseInt(state.boards[next].id, 10),
      };
      return res;
    }
    case PREVIOUS_BOARD: {
      const maxBoards = state.boards.length;
      let next;
      const currentBoardIndex = state.boards.findIndex((e) => e.id === state.index.toString());
      if (currentBoardIndex === -1) { return state; }
      if (currentBoardIndex === 0) { next = maxBoards - 1; } else { next = currentBoardIndex - 1; }
      const res = {
        ...state,
        index: parseInt(state.boards[next].id, 10),
      };
      return res;
    }
    case SET_INDEX: {
      const indexElem = state.boards.findIndex((e) => e.id === action.payload.index);
      if (indexElem === -1) { return state; }
      const res = {
        ...state,
        // index : indexElem + 1,
        currentPostit: '1',
        index: parseInt(state.boards[indexElem].id, 10),
      };
      return res;
    }
    case NEXT_POSTIT: {
      const indexElem = state.boards.findIndex((e) => e.id === action.payload.id);
      const maxlengthPostitTab = state.boards[indexElem].postits.length;
      let indexPostit = parseInt(action.payload.idPostit, 10);
      if (maxlengthPostitTab === 0) {
        const res = {
          ...state,
          currentPostit: '1',
        };
        return res;
      }
      if (indexPostit === maxlengthPostitTab) { indexPostit = 1; } else indexPostit += 1;
      const res = {
        ...state,
        currentPostit: indexPostit.toString(),
      };
      return res;
    }
    case PREVIOUS_POSTIT: {
      const indexElem = state.boards.findIndex((e) => e.id === action.payload.id);
      const maxlengthPostitTab = state.boards[indexElem].postits.length;
      let indexPostit = parseInt(action.payload.idPostit, 10);
      if (maxlengthPostitTab === 0) {
        const res = {
          ...state,
          currentPostit: '1',
        };
        return res;
      }
      if (indexPostit === 1) { indexPostit = maxlengthPostitTab; } else { indexPostit -= 1; }
      const res = {
        ...state,
        currentPostit: indexPostit.toString(),
      };
      return res;
    }
    case ADD_DRAW_POINTS: {
      const indexBoard = state.boards.findIndex((e) => e.id === action.payload.id);
      const indexPostit = action.payload.idPostit;
      const res = {
        ...state,
        boards: [
          ...state.boards.slice(0, indexBoard),
          {
            ...state.boards[indexBoard],
            postits: [
              ...state.boards[indexBoard].postits.slice(0, indexPostit),
              {
                ...state.boards[indexBoard].postits[indexPostit],
                drawing: {
                  clickX: state.boards[indexBoard].postits[indexPostit].drawing.clickX
                    .concat(action.payload.x),
                  clickY: state.boards[indexBoard].postits[indexPostit].drawing.clickY
                    .concat(action.payload.y),
                  clickDrag: state.boards[indexBoard].postits[indexPostit].drawing.clickDrag
                    .concat(action.payload.drag),
                },
              },
              ...state.boards[indexBoard].postits.slice(indexPostit + 1),
            ],

          },
          ...state.boards.slice(indexBoard + 1),
        ],
      };
      return res;
    }
    case RESET_DRAW_POINTS: {
      const indexBoard = state.boards.findIndex((e) => e.id === action.payload.id);
      const indexPostit = action.payload.idPostit;
      const res = {
        ...state,
        boards: [
          ...state.boards.slice(0, indexBoard),
          {
            ...state.boards[indexBoard],
            postits: [
              ...state.boards[indexBoard].postits.slice(0, indexPostit),
              {
                ...state.boards[indexBoard].postits[indexPostit],
                drawing: {
                  clickX: [],
                  clickY: [],
                  clickDrag: [],
                },
              },
              ...state.boards[indexBoard].postits.slice(indexPostit + 1),
            ],

          },
          ...state.boards.slice(indexBoard + 1),
        ],
      };
      return res;
    }
    default:
      return state;
  }
}

export default rootReducer;
