import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// import { UserLogin } from '../screens/UserLogin';
// import { UserSignup } from '../screens/UserSignup';
import { ClassList } from '../screens/ClassList';
import { Subclass } from '../screens/Subclass';
import { DrugList } from '../screens/DrugList';
import { DrugInfo } from '../screens/DrugInfo';
import { Compare } from '../screens/Compare';
import { Antibiotics } from '../screens/Antibiotics';
import { Bacteria } from '../screens/Bacteria';
import { AntibioBac } from '../screens/AntibioBac';
import { About } from '../screens/AboutUs';
import { Login } from '../screens/UserLogin';
import { Account } from '../screens/UserSignup';

import styles from '../style';


const ToSubclass = createStackNavigator({
    Subclass,
    DrugList,
    DrugInfo
}, {
    headerMode: 'none'
})

// Navigator for class without subclass
const ToDrugList = createStackNavigator({
    DrugList,
    DrugInfo
}, {
    headerMode: 'none'
})

const ToDrugInfo = createStackNavigator({
    DrugInfo,
    DrugList
}, {
    headerMode: 'none',
})


const ToAntibiotics = createStackNavigator({
    Antibiotics,
    Bacteria,
    AntibioBac
}, {
    headerMode: 'none'
})

const ToBacteria = createStackNavigator({
    Bacteria
}, {
    headerMode: 'none'
})

const ToAntibioBac = createStackNavigator({
    AntibioBac
}, {
    headerMode: 'none'
})


const ReferenceNavigator = createStackNavigator({
    ClassList,
    ToSubclass,
    ToDrugList,
    ToDrugInfo,
    ToAntibiotics,
    ToBacteria,
    ToAntibioBac
})


const Home = createBottomTabNavigator({
            ClassList: {
                screen: ReferenceNavigator,
                navigationOptions: {
                    tabBarLabel: 'Catalog',
                    tabBarIcon: ({ tintColor }) => < MaterialCommunityIcons name = "pill"
                    style = { styles.footer_icon }
                    color = { tintColor }
                    />
                }
            },

            Compare: {
                screen: Compare,
                navigationOptions: ({ navigation }) => ({
                        tabBarLabel: 'Compare',
                        tabBarIcon: ({ tintColor }) => ( < MaterialCommunityIcons name = "file-compare"
                            style = { styles.footer_icon }
                            color = { tintColor }
                            onPress = {
                                () => navigation.navigate('Compare', { date: new Date() })
                            }
                            />)
                        })

                }
            },

            {
                tabBarOptions: {
                    activeTintColor: '#007FAE',
                    inactiveTintColor: '#767676',
                    labelStyle: {
                        marginBottom: 5
                    },
                    style: {
                        height: 55,
                        paddingTop: 5
                    },
                }

            }
        );

const DrawerNavigator = createDrawerNavigator({
            Home,
            Account,
            About
        },
        {
          contentOptions: {
              activeTintColor: '#007FAE',
              inactiveTintColor: '#767676',
              labelStyle:{
                  fontFamily:'Open-Sans-SemiBold',
                  fontSize: 14
              }
            }
        }
    );

export const AppContainer = createAppContainer(DrawerNavigator);