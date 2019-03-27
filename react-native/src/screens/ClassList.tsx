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
import SearchBar from 'react-native-search-bar'
import { Separator } from 'native-base';
import { AppLoading, Font } from 'expo';

import styles from '../style';
import { firebase } from '../utils/FirebaseWrapper';
let itemsRef = firebase.database.ref('/drugs');

export class ClassList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  // search1: SearchBar

  componentDidMount() {
    this._getClassList();
    // this.refs.searchBar.focus();
  }

   _getClassList(){
     const content = [{key: 'hello'}, {key: 'oh'}, {key: 'my'},{key: 'z'},{key: 'ashell'}];
     this.setState({
          data: [...this.state.data, ...content, ...content]
        });
  }
  

  render() {
    return (
       <Container>
         <Content padder>
           <Text style={styles.title}>Bedside <Text style={styles.title_light}>Pharmacist</Text></Text>
         
            <View style={styles.container}>
              <FlatList
                data={this.state.data}
                //need a data extractor here
                renderItem={({item}) => 
                  <ListItem noIndent>
                    <Left>
                      <Text style={styles.class_list}>{item.key}</Text>
                    </Left>
                    <Right>
                      <Ionicons name="ios-arrow-forward" style={styles.forward_icon}></Ionicons>
                   </Right>
                 </ListItem>
              }
              />
            </View>
          </Content>
      </Container>
    );
  }
}