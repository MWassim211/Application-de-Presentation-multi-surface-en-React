/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import AppToolbar from './components/AppToolbar';
import Board from './components/Board';
import Drawer from './components/Drawer'
import store from './store/index'
import { createBoard } from './actions/index'
window.store = store;
window.createBoard = createBoard;
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { Provider } from 'react-redux'

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
  // const [boards, setBoards] = React.useState(DONNEES_CI_DESSUS);
  
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <AppToolbar />
          <Switch>
            <Route path="/:id" render={(routeProps) => <Board match={routeProps.match} />}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
