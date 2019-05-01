
/*
Base Class:
 1. Load firebase data, font
 2. Render homepage
*/

//Import package
import React, { Component } from 'react';
import { AppLoading, Font } from 'expo';
import { AsyncStorage } from 'react-native';

//Import components and utils
import { AppContainer } from './components/navigator';
import { firebase } from './utils/FirebaseWrapper';

//Reference data
let itemsRef = firebase.database.ref('/drugs');

// Global cache
const Cache = require('global-cache');

//Delete later, for development use only
import { AntibioBac } from './screens/AntibioBac';
import { DrugInfo } from './screens/DrugInfo';

export default class App extends Component {
  state: {
    font_loaded: boolean;
  };

  constructor(props) {
    super(props);
    this.state = {
      font_loaded: false
    };
  }

  componentWillMount() {
    this._loadFontsAsync();
  }

  componentDidMount() {
    // Load data from Firebase into AsyncStorage and global cache
    Cache.set('is_data_loaded', new Promise((resolve, reject) => {
      itemsRef.on('value', async (snapshot) => {
        if (!snapshot) {
          reject();
          throw new Error('could not fetch from Firebase');
        }
        resolve();

        let drugs_data = snapshot.val();
        Cache.set('drugs_data', drugs_data); // temporary cache
        await AsyncStorage.setItem('drugs_data', JSON.stringify(drugs_data)); // persistent storage
      });
    }))
  }

   _loadFontsAsync = async () => {
    await Font.loadAsync({
      'Open-Sans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      'Open-Sans-SemiBold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
      'Open-Sans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'Open-Sans-Light': require('../assets/fonts/OpenSans-Light.ttf'),
      'Open-Sans-Italic': require('../assets/fonts/OpenSans-Italic.ttf'),
    });
    this.setState({ font_loaded: true});
  }

  render() {
    if (!this.state.font_loaded) {
      return <AppLoading />;
    }
    return <AppContainer />;
    // return <AntibioBac/>;
  }
}