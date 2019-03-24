
/*
Framework usage:
 1. NativeBase (https://github.com/GeekyAnts/NativeBase)
 2. @expo/vector-icons (https://docs.expo.io/versions/latest/guides/icons/)
*/

import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Card, CardItem, Content, FooterTab, Icon, Footer } from 'native-base';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


import { Constants } from 'expo';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import EStyleSheet from 'react-native-extended-stylesheet'; 

import {AccordionList} from "accordion-collapse-react-native";
import { Separator } from 'native-base';
import { AppLoading, Font } from 'expo';

import styles from './style';
import { firebase } from './utils/FirebaseWrapper';
let itemsRef = firebase.database.ref('/drugs');
import { createStackNavigator, createAppContainer } from 'react-navigation';


import { UserLogin, UserSignup } from './views/UserAuth';
import { DrugInfo } from './views/DrugInfo';
import { ClassList } from './views/ClassList';



const AppNavigator = createStackNavigator(
  {
    DrugInfo,
    UserLogin,
    UserSignup
  },
  {
    initialRouteName: 'DrugInfo'
  }
);

const AppContainer = createAppContainer(AppNavigator);


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

    // return <AppContainer />;

    return (<ClassList/>);
    // return (<UserLogin/>);
    // return (<UserSignup/>);
  }
}