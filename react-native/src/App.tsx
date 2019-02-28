import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import styles from './style'
import { Button, Header, Icon} from 'react-native-elements';
// import Icon from 'react-native-vector-icons';



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

      <View style={[styles.page_layout, styles.drug_page]}>

      <Header 
      leftComponent={{ text: 'menu', color: '#fff' }}
      centerComponent={{ text: 'Durg Reference App', style: { color: '#fff' } }}
      rightComponent={{ text: 'home', color: '#fff' }}/>

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
