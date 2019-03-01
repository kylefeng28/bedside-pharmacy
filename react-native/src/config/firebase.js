// TODO read from environment file
const apiKey = 'AIzaSyB7k82FOl4URQb5vAVGoP4LEIVzE1OOo74';
const projectId = 'drug-reference-f3c33';
const databaseName = 'drug-reference-f3c33';
const bucket = 'drug-reference-f3c33';

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: projectId + '.firebaseapp.com',
  databaseURL: 'https://' + databaseName + '.firebaseio.com/',
  storageBucket: bucket + '.appspot.com',
};

export default firebaseConfig;