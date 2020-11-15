import React from 'react';
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
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <AppToolbar isMobile={isMobile} />

          <Switch>
            { isMobile && <Redirect exact from="/:id" to="/:id/postit/1" />}
            { !isMobile && <Redirect exact from="/:id/postit/:idPostit" to="/:id" />}
            <Route exact path="/:id">
              <Board />
            </Route>
            <Route exact path="/:id/postit/:idPostit">
              <BoardMobile />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
