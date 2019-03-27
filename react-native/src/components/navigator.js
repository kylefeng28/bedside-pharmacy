// import React from 'react';
// import { TabNavigator, StackNavigator } from 'react-navigation';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// import { UserLogin, UserSignup } from '../views/UserAuth';
// import { DrugInfo } from '../views/DrugInfo';
// import { ClassList } from '../views/ClassList';

// export const Tabs = TabNavigator({
//   DrugInfo: {
//     screen: DrugInfo,
//     navigationOptions: {
//       tabBarLabel: 'Feed',
//       tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="pill" style={styles.footer_icon} />,
//     },
//   },
//   ClassList: {
//     screen: ClassList,
//     navigationOptions: {
//       tabBarLabel: 'Me',
//       tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="file-compare" style={styles.footer_icon} />
//     },
//   },
// });

// // export const Root = StackNavigator({
// //   Tabs: {
// //     screen: Tabs,
// //   },
// //   Settings: {
// //     screen: SettingsStack,
// //   },
// // }, {
// //   mode: 'modal',
// //   headerMode: 'none',
// // });