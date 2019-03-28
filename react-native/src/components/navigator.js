import React from 'react';
import { createStackNavigator, createAppContainer,createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { UserLogin, UserSignup } from '../screens/UserAuth';
import { DrugInfo } from '../screens/DrugInfo';
import { ClassList } from '../screens/ClassList';
import { Subclass } from '../screens/Subclass';

import styles from '../style';

const SubclassStack = createStackNavigator(
    {
      Subclass:{
        screen: Subclass,
        navigationOptions:{
          title: 'Drug Reference',
        }
      }
    }
  );



const DrugInfoStack = createStackNavigator(
    {
      ClassList,
      DrugInfo:{
        screen: DrugInfo,
        navigationOptions:{
          title: 'Drug Reference',
        }
      }
    }
  );

// const ClassListTab = createAppContainer(
//     {

//     }

//   );

const TabNavigator = createBottomTabNavigator(
  {
    ClassList:{
      screen: ClassList,
      navigationOptions:{
        tabBarLabel:'Catalog',
        tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="pill" style={styles.footer_icon} color={tintColor} />
      }
    },

    DrugInfo:{
      screen: DrugInfoStack,
      navigationOptions:{
        tabBarLabel:'Compare',
        tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="file-compare" style={styles.footer_icon} color={tintColor} />
      }

    }
  },

  {
    // initialRouteName: 'ClassList',
    tabBarOptions: {
        activeTintColor: '#007FAE',
        inactiveTintColor: '#767676',
        labelStyle:{
          marginBottom: 5
        },
        style: {
          height: 55,
          paddingTop: 5
        },
      }

  }
);

const AppNavigator = createStackNavigator(
    {
      ClassList,
      Subclass
    },
    {
      initialRouteName: 'ClassList'
    }

  );

export const AppContainer = createAppContainer(AppNavigator);



