import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import AppToolbar from './components/AppToolbar';

const DONNEES_CI_DESSUS = [
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
        text: 'Le TP porte sur la creation d\'un outil de presentation HTML',
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
    board: '2',
    title: 'Courses',
    active: false,
    notes: '',
    postits: [],
  },
];

function App() {
  const [boards, setBoards] = React.useState(DONNEES_CI_DESSUS);

  return (
    <div className="app">
      { setBoards }
      <AppToolbar boards={boards} index={0} />
      <Board board={boards} index={0} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
