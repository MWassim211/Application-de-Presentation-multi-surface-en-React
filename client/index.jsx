/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/index';
import Content from './components/Content/index';
import AppToolbar from './components/AppToolbar'

const Index = () => (
  <div className="container">
    <AppToolbar></AppToolbar>
    <Header />
    <Content />
  </div>
);
ReactDOM.render(<Index />, document.getElementById('root'));
