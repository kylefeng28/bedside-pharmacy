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

import styles from './style';
import {db} from './config/firebase';
let itemsRef = db.ref('/drugs');

export class UserRegistration extends Component {
  render() {
    return (
      <Text>Sign up</Text>
    );
  }
}

export class UserLogin extends Component {
  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Ionicons name="ios-arrow-back" style={styles.header_icon} />
            </Button>
          </Left>

          <Body style={styles.header_text_box}>
            <Title style={styles.header_text}>Drug References</Title>
            <Text>Please login</Text>
          </Body>
        </Header>
      </Container>);
  }
}