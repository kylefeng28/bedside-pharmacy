import React from 'react';
import { createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { UserLogin, UserSignup } from '../screens/UserAuth';
import { DrugInfo } from '../screens/DrugInfo';
import { ClassList } from '../screens/ClassList';

import styles from '../style';

const AppNavigator = createBottomTabNavigator(
  {
    ClassList:{
      screen: ClassList,
      navigationOptions:{
        tabBarLabel:'Catalog',
        tabBarIcon: ({}) => <MaterialCommunityIcons name="pill" style={styles.footer_icon} />
      }
    },
    DrugInfo:{
      screen: DrugInfo,
      navigationOptions:{
        tabBarLabel:'Compare',
        tabBarIcon: ({}) => <MaterialCommunityIcons name="file-compare" style={styles.footer_icon} />
      }

    }
  },

  {
    initialRouteName: 'ClassList',
  }
);

export const AppContainer = createAppContainer(AppNavigator);



