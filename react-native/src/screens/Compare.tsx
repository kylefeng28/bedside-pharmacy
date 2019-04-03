import {
  Text,
  View,
  Switch,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Card, CardItem, Content, FooterTab, Icon, Footer, List, ListItem } from 'native-base';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';


export class Compare extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  // search1: SearchBar

  componentDidMount() {
   
  }

 
  

  render() {
    return (
       <Container>
         <Content padder>
           <Text>hello</Text>
          </Content>
      </Container>
    );
  }
}