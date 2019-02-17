import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Editor from './Editor'

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Editor/>
      </div>
    );
  }
}