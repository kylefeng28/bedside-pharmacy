// TODO read from environment file
const apiKey = 'AIzaSyB7k82FOl4URQb5vAVGoP4LEIVzE1OOo74';
const projectId = 'drug-reference-f3c33';
const databaseName = 'drug-reference-f3c33';
const bucket = 'drug-reference-f3c33';

import Firebase from 'firebase';
let config = {
	apiKey: apiKey,
	authDomain: projectId + '.firebaseapp.com',
	databaseURL: 'https://' + databaseName + '.firebaseio.com/',
	projectId: projectId,
	storageBucket:  bucket + '.appspot.com',
	messagingSenderId: '714865155586'
};

let app = Firebase.initializeApp(config);
export const db = app.database();
