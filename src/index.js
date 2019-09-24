import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { List, Create, Update, Delete } from './App';
import * as serviceWorker from './serviceWorker';
import Header from './Header.js';

ReactDOM.render(
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={List} />
      <Route path="/create" component={Create} />
      <Route path="/update" component={Update} />
      <Route path="/delete" component={Delete} />
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
