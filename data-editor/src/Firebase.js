import React from 'react';

import firebaseConfig from './config/firebase';
import app from 'firebase/app';
import 'firebase/database';

export default class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.app = app;
    this.database = app.database();
    this.drugsRef = this.database.ref('/drugs');
  }
}

export const FirebaseContext = React.createContext(null);