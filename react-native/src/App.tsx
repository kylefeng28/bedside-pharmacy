import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import styles from './style'
// import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const Link = (props) => (
  <Text
    {...props}
    accessibilityRole='link'
    style={[styles.link, props.style]}
  />
);

export default class App extends React.Component {
  public render() {
    return (
      <View style={styles.app}>

        <View style={styles.header}>
          <Text style={styles.title}>React Native for Web</Text>
        </View>
        <Text style={styles.text}>
          This is an example of an app built with{' '}
          <Link href='https://github.com/facebook/create-react-app'>
            Create React App
          </Link>{' '}
          and{' '}
          <Link href='https://github.com/necolas/react-native-web'>
            React Native for Web
          </Link>
        </Text>
        <Text style={styles.text}>
          To get started, edit{' '}
          <Link href='https://codesandbox.io/s/q4qymyp2l6/' style={styles.code}>
            src/App.js
          </Link>
          .
        </Text>
        <Button onPress={() => {}} title='Example button' />
      </View>
    );
  }
}
