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

import SearchBar from 'react-native-search-bar'
import Search from 'react-native-search-box';

import styles from '../style';

export class Subclass extends Component {

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
           <Text style={styles.title}>Subclass</Text>
         
            <View style={styles.class_list}>
              <FlatList
                data={this.state.data}
                //need a data extractor here
                renderItem={({item}) => 
                  <ListItem noIndent>
                    
                    <MaterialCommunityIcons name="circle-outline" style={styles.circle_icon}></MaterialCommunityIcons>  
                    <Text style={styles.subclass_list_item}>{item.key}</Text>  

                  
                    
                 </ListItem>
              }
              />
            </View>
          </Content>
      </Container>
    );
  }
}