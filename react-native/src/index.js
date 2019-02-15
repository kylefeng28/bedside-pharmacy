// Entry point for web (used by react-scripts)
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
});
