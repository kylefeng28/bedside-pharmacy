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
    this.getSubclassList();
    // this.refs.searchBar.focus();
  }

  getSubclassList(){
     const content = [{key: 'Barbiturates'}, {key: 'Benzodiazepines'}, {key: 'Dexmedetomidine'},{key: 'Phenobarbital'},{key: 'Propofol'},{key: 'Ketamine'}];
     this.setState({
          data: [...this.state.data, ...content]
        });
  }

  _clickSubclass = () => {
    this.props.navigation.navigate('DrugListTab');
  };
  

  render() {
    return (
       <Container>
         <Content padder>
           <Text style={styles.title}>Sedation</Text>
         
            <View style={styles.subclass_list}>
              <FlatList
                data={this.state.data}
                //need a data extractor here
                renderItem={({item}) => 
                  <ListItem noIndent style={styles.subclass_list_item}
                  			onPress={() => this._clickSubclass()}>
                    
                    <MaterialCommunityIcons name="circle-outline" style={styles.circle_icon}></MaterialCommunityIcons>  
                    <Text style={styles.subclass_list_item_text}>{item.key}</Text>  
                    
                 </ListItem>
              }
              />
            </View>
          </Content>
      </Container>
    );
  }
}