/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/index';
import Content from './components/Content/index';
import AppToolbar from './components/AppToolbar';
import Board from './components/Board';

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
    board: '2',
    title: 'Courses',
    active: false,
    notes: '',
    postits: [],
  },
];
const [boards, setBoards] = React.useState(DONNEES_CI_DESSUS);
const Index = () => (
  <div className="container">
    <AppToolbar />
    <Board board={boards} index={0} />
    <Header />
    <Content />
  </div>
);
ReactDOM.render(<Index />, document.getElementById('root'));
