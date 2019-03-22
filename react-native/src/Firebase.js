// import React from 'react';

// import firebaseConfig from './config/firebase';
// import app from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

// export default class Firebase {
//   constructor() {
//     app.initializeApp(firebaseConfig);
//     this.app = app;
//     this.auth = app.auth();
//     this.database = app.database();
//     this.drugsDbRef = this.database.ref('/'); // /drugs
//   }

//   doSignInWithEmailAndPassword = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password);

//   doSignOut = () => this.auth.signOut();

// }

// export const FirebaseContext = React.createContext(null);