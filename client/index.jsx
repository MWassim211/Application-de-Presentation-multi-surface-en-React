/* eslint-disable */
import React , {useState } from 'react';
import ReactDOM from 'react-dom';
import AppToolbar from './components/AppToolbar';
import Board from './components/Board';
import BoardMobile from './components/BoardMobile';
import Drawer from './components/Drawer'
import MobileToolbar from './components/MobileToolbar';
import store from './store/index'
import { createBoard } from './actions/index'
import {isMobile} from 'react-device-detect';
window.store = store;
window.createBoard = createBoard;
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
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
  const [boardDisplay, setBoardDisplay] = useState('');
  const handleOnBoardChange = (name) => {
    setBoardDisplay(name);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <AppToolbar boardNameDisplay={boardDisplay}/>
          {console.log(isMobile+"hallo")}
          {/* <Switch>
            <Route exact path="/:id" render={(routeProps) => isMobile ? <Redirect to="/:id/postit/1" /> : <Board match={routeProps.match} onBoardChange={handleOnBoardChange} />}></Route>
            <Route exact path="/:id/postit/:idpostit" render={(routeProps) => <Board match={routeProps.match} onBoardChange={handleOnBoardChange} test={isMobile}/>}></Route> 
          </Switch> */}
          <Switch>
          {/* <Route exact path="/">
          {isMobile ? <Redirect to={`/${store.getState().index}/postit/1`} /> : <Board onBoardChange={handleOnBoardChange} />}
        </Route> */}
            {/* <Route exact path="/:id">
              { isMobile ? <Redirect from="/:id" to="/:id/postit/1" /> : <Board onBoardChange={handleOnBoardChange} /> }
            </Route>
            <Route  exact path="/:id/postit/:idPostit">
              {isMobile ? <BoardMobile onBoardChange={handleOnBoardChange}></BoardMobile> : <Redirect to="/"></Redirect>}
            </Route> */}
            {
              isMobile
              && <Redirect exact from="/:id" to="/:id/postit/1" />
            }
            {
              !isMobile
              && <Redirect exact from="/:id/postit/:idPostit" to="/:id" />
            }
            <Route exact path="/:id">
              <Board onBoardChange={handleOnBoardChange} /> 
            </Route>
            <Route  exact path="/:id/postit/:idPostit">
              <BoardMobile onBoardChange={handleOnBoardChange}></BoardMobile> 
            </Route>
          </Switch>
{/* 
          {
              isMobile
              && <MobileToolbar></MobileToolbar>
            } */}
        </div>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
