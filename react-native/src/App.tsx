/*
Framework usage:
 1. NativeBase (https://github.com/GeekyAnts/NativeBase)
 2. react-native-vector-icons (https://github.com/oblador/react-native-vector-icons)
*/

import React, { Component } from 'react';
import styles from './style';
import { Container, Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default class HeaderExample extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
             <Ionicons name="md-checkmark-circle" size={32} color="green" />
            </Button>
          </Left>

          <Body>
            <Title>Drug Reference App</Title>
          </Body>

          <Right>
            <Button transparent>
            </Button>
          </Right>
        </Header>
        <Title style={styles.text}>Hello</Title>
      </Container>
    );
  }
}