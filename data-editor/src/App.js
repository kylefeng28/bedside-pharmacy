import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Editor from './Editor'

// import { FirebaseContext } from './Firebase';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <FirebaseContext.Consumer>
          {
            // TODO
            (firebase) => {
              window['firebase'] = firebase;
              // listen for data
              firebase.drugsDbRef.on('value', function (snapshot) {
                console.log(snapshot.val());
              });
            }
          }
        </FirebaseContext.Consumer> */}
        <Editor />
      </div>
    );
  }
}