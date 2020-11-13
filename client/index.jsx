import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { isMobile } from 'react-device-detect';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import AppToolbar from './components/AppToolbar';
import Board from './components/Board';
import BoardMobile from './components/BoardMobile';
import store from './store/index';

function App() {
  const [boardDisplay, setBoardDisplay] = useState('');
  const handleOnBoardChange = (name) => {
    setBoardDisplay(name);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <AppToolbar boardNameDisplay={boardDisplay} />

          <Switch>
            { isMobile && <Redirect exact from="/:id" to="/:id/postit/1" />}
            { !isMobile && <Redirect exact from="/:id/postit/:idPostit" to="/:id" />}
            <Route exact path="/:id">
              <Board onBoardChange={handleOnBoardChange} />
            </Route>
            <Route exact path="/:id/postit/:idPostit">
              <BoardMobile onBoardChange={handleOnBoardChange} />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
