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

import { firebase } from '../utils/FirebaseWrapper';
let itemsRef = firebase.database.ref('/drugs');

import styles from '../style';


export class ClassList extends Component {

  static navigationOptions = {
    header: null
  }
  state:{
    items: any[];
  }

  constructor(props) {
    super(props);

    this.state = {
      data:[],
    };
  }

  // search1: SearchBar

  componentDidMount() {
    this.getClassList();
    // this.refs.searchBar.focus();
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      // console.log(data['0'])
      // let items = Object.values(data);
      let class_names = Object.keys(data);
      console.log(class_names);
      // this.setState({ items });
      // console.log(this.state.items['0']) 
      // this.getClassList(class_names);
    });
  }

   getClassList(class_names){
     // console.log(class_names);
     const content = [{key: 'Anticid'}, {key: 'Antiarrhythmic'}, {key: 'Anticoagulant'},{key: 'Antiemetic'},{key: 'Antihypertensive'}, {key: 'Antipsychotic'}, {key: 'Anticonvulsant'}, {key: 'Benzodiazepines'},{key: 'Blood Products'}, {key: 'Bronchodilator'}, {key: 'Coagulation Reversal Products'}, {key: 'Insulin'}, {key: 'Hyperosmolar Therapy'}, {key: 'Non-opioid Analgesics'}, {key: 'Opioids'},{key: 'Sedation'}, {key: 'Steroids'}, {key: 'Vasoperssors'}, {key: 'Misc'}];
     this.setState({
          data: [...this.state.data, ...content]
        });
  }

  _clickClass = () => {
    this.props.navigation.navigate('InsertNavigator');
  };
  

  render() {
    return (
       <Container>
         <Content padder>
           <Text style={[styles.title,styles.main_title]}>Bedside <Text style={styles.title_light}>Pharmacist</Text></Text>
           <View styles = {styles.seach_box}>
             <Search
                ref='search_box'
                backgroundColor= '#FFFFFF'
                cancelTitle='Cancel'     
                titleCancelColor='#007FAE'
                tintColorSearch='#151515'
                inputHeight={40}
                // iconSearch = {<Ionicons name="ios-search" style={styles.search_icon}></Ionicons>}
                iconCancel = {<Entypo name="circle-with-cross" style={styles.search_icon}></Entypo>}
                middleWidth = {100}
              />
            </View>
            <View style={styles.class_list}>
              <Text style={styles.by_class}>By Class</Text>
              <FlatList
                data={this.state.data}
                //need a data extractor here
                renderItem={({item}) => 
                  <ListItem noIndent
                  onPress={() => this._clickClass()}>
                    <Left>
                      <Text style={styles.class_list_item}>{item.key}</Text>
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