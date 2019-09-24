import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import listApp from './listApp';
import createApp from './createApp';
import updateApp from './updateApp';
import deleteApp from './deleteApp';

export class List extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={listApp} />
      </div>
    );
  }
}

export class Create extends Component {
  render() {
    return (
      <div>
        <Route exact path="/create" component={createApp} />
      </div>
    )
  }
}

export class Update extends Component {
  render() {
    return (
      <div>
        <Route exact path="/update" component={updateApp} />
      </div>
    )
  }
}

export class Delete extends Component {
  render() {
    return (
      <div>
        <Route exact path="/delete" component={deleteApp} />
      </div>
    )
  }
}