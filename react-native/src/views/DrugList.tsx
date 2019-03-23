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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Constants } from 'expo';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import EStyleSheet from 'react-native-extended-stylesheet'; 

import {AccordionList} from "accordion-collapse-react-native";
import { Separator } from 'native-base';
import { AppLoading, Font } from 'expo';

import styles from '../style';
import { firebase } from '../utils/FirebaseWrapper';
let itemsRef = firebase.database.ref('/drugs');

export class DrugList extends Component {

  _renderdrugListItem(){
    return(
       <ListItem>
         <Left>
           <Text>Nathaniel Clyne</Text>
         </Left>
         <Right>
           <Ionicons name="ios-arrow-forward"/>
         </Right>
       </ListItem>
      );
  }
  

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
          </Body>

          <Right>
            <Button transparent>
              <Ionicons name="ios-search" style={styles.header_icon} />
            </Button>
          </Right>
        </Header>

        <Content>
          <List>
            <ListItem selected>
              <Left>
                <Text>Simon Mignolet</Text>
              </Left>
              <Right>
                <Ionicons name="ios-arrow-forward"/>
              </Right>
            </ListItem>
            <ListItem>
             <Left>
                <Text>Nathaniel Clyne</Text>
              </Left>
              <Right>
                 <Ionicons name="ios-arrow-forward"/>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Dejan Lovren</Text>
              </Left>
              <Right>
                 <Ionicons name="ios-arrow-forward"/>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}