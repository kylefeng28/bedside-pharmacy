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

import styles from '../style';


/*
const InsertNavigator = createStackNavigator({
    Subclass,
    DrugList,
    DrugInfo
}, {
    headerMode: 'none'
})

// Navigator for class without subclass
const InsertNavigator2 = createStackNavigator({
    DrugList,
    DrugInfo
}, {
    headerMode: 'none'
})

const InsertNavigator3 = createStackNavigator({
    DrugInfo
}, {
    headerMode: 'none'
})


const ReferenceNavigator = createStackNavigator({
    ClassList,
    InsertNavigator,
    InsertNavigator2,
    InsertNavigator3,
})

const AppNavigator = createBottomTabNavigator({
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
                                () => navigation.navigate('Compare', { date: new Date() }) }
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

        export const AppContainer = createAppContainer(AppNavigator);
*/

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
}, {
    headerMode: 'none'
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


const ReferenceNavigator = createStackNavigator({
    ClassList,
    ToSubclass,
    ToDrugList,
    ToDrugInfo,
    ToAntibiotics,
    ToBacteria
})

const AppNavigator = createBottomTabNavigator({
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

        export const AppContainer = createAppContainer(AppNavigator);