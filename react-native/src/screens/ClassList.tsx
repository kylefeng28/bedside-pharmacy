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

//Load Firebase
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

  componentDidMount() {
    this.getClassList();
  }

  getClassList(){
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let class_names = Object.keys(data);
      var class_array = [];

      // Replace '*' with '/' for class value
      for (i = 0; i < class_names.length; i++) {
        let a = {key:JSON.stringify(class_names[i]).replace(/\"/g, ""),value:JSON.stringify(class_names[i]).replace(/\"/g, "").replace('*',' / ')};
        class_array.push(a);
      }

      // Placeholder value, delete later, need to change keys into value in the rendering below

      // const content = [{key: 'Anticid'}, {key: 'Antiarrhythmic'}, {key: 'Anticoagulant'},{key: 'Antiemetic'},{key: 'Antihypertensive'}, {key: 'Antipsychotic'}, {key: 'Anticonvulsant'}, {key: 'Benzodiazepines'},{key: 'Blood Products'}, {key: 'Bronchodilator'}, {key: 'Coagulation Reversal Products'}, {key: 'Insulin'}, {key: 'Hyperosmolar Therapy'}, {key: 'Non-opioid Analgesics'}, {key: 'Opioids'},{key: 'Sedation'}, {key: 'Steroids'}, {key: 'Vasoperssors'}, {key: 'Misc'}];

      this.setState({
        data:[...class_array]
      })
    });
  }

 
 // Maybe extracct the clickClass functionlater
  // _clickClass = () => {
  //   this.props.navigation.navigate('InsertNavigator',{key: item.value});
  // };
  
  _clickClass(class_key){
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();

      // slice the last element as it is the label info as default
      let subclass_key = Object.keys(data[class_key])[0];
      if (subclass_key == '_'){
        console.log('hello')
        this.props.navigation.navigate('InsertNavigator2',{class_key: class_key, subclass_key: subclass_key });
      } else{
        this.props.navigation.navigate('InsertNavigator',{class_key: class_key});
      }

      // console.log(class_names);
      // var subclass_array = [];

      // for (var i = 0; i < subclass_names.length; i++) {
      //   let a = {key:JSON.stringify(subclass_names[i]).replace(/\"/g, ""),value:JSON.stringify(subclass_names[i]).replace(/\"/g, "")};
      //   subclass_array.push(a);

      // }

      //  console.log(subclass_array)
      });

  
    // console.log(class_key);

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
                  onPress={() => this._clickClass(item.key)}>
                    <Left>
                      <Text style={styles.class_list_item}>{item.value}</Text>
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