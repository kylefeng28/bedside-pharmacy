import React from 'react';
import { createStackNavigator, createAppContainer,createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { UserLogin, UserSignup } from '../screens/UserAuth';
import { ClassList } from '../screens/ClassList';
import { Subclass } from '../screens/Subclass';
import { DrugList } from '../screens/DrugList';
import { DrugInfo } from '../screens/DrugInfo';

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


const ClassTab = createBottomTabNavigator(
  {
    ClassList:{
      screen: ClassList,
      navigationOptions:{
        tabBarLabel:'Catalog',
        tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="pill" style={styles.footer_icon} color={tintColor} />
      }
    },

    UserLogin:{
      screen: UserLogin,
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

const SubclassTab = createBottomTabNavigator(
  {
    ClassList:{
      screen: Subclass,
      navigationOptions:{
        tabBarLabel:'Catalog',
        tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="pill" style={styles.footer_icon} color={tintColor} />
      }
    },

    UserLogin:{
      screen: UserLogin,
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

const DrugListTab = createBottomTabNavigator(
  {
    ClassList:{
      screen: DrugList,
      navigationOptions:{
        tabBarLabel:'Catalog',
        tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="pill" style={styles.footer_icon} color={tintColor} />
      }
    },

    UserLogin:{
      screen: UserLogin,
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

const DrugInfoTab = createBottomTabNavigator(
  {
    ClassList:{
      screen: DrugInfo,
      navigationOptions:{
        tabBarLabel:'Catalog',
        tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="pill" style={styles.footer_icon} color={tintColor} />
      }
    },

    UserLogin:{
      screen: UserLogin,
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
      ClassTab,
      ClassList,
      SubclassTab,
      DrugListTab,
      DrugInfoTab
    },
    {
      initialRouteName: 'ClassTab'
    }

  );



export const AppContainer = createAppContainer(AppNavigator);


