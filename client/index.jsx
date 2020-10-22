/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/index';
import Content from './components/Content/index';
import AppToolbar from './components/AppToolbar';
import Board from './components/Board';
import Drawer from './components/Drawer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

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
    },],
  },
];
function App() {
  const [boards, setBoards] = React.useState(DONNEES_CI_DESSUS);

  return (
    <Router>
      <div className="app">
        <AppToolbar boards={boards} />
        {/* <Board board={boards} index={0}/> */}
        <Switch>
          <Route path="/:id" render={(routeProps) => <Board boards={boards} match={routeProps.match} />}></Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
