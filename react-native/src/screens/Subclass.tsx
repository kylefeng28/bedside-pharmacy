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

export class Subclass extends Component {

  constructor(props) {
    super(props);

    this.state = {
      class_key: props.navigation.getParam('class_key', ''),
      data: [],
    };
  }

  // search1: SearchBar
  componentDidMount() {
    this.getSubclassList();
  }

  getSubclassList(){
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();

      // slice the last element as it is the label info as default
      let subclass_names = Object.keys(data[this.state.class_key]).slice(0, -1);

      // console.log(class_names);
      var subclass_array = [];

      for (var i = 0; i < subclass_names.length; i++) {
        let a = {key:JSON.stringify(subclass_names[i]).replace(/\"/g, ""),value:JSON.stringify(subclass_names[i]).replace(/\"/g, "")};
        subclass_array.push(a);

      }

       // console.log(subclass_array)
       this.setState({
          data: [...subclass_array]
        });
      });
  }

  _clickSubclass(subclass_key){
    this.props.navigation.navigate('DrugList',{class_key: this.state.class_key, subclass_key: subclass_key });
  };
  

  render() {
    return (
       <Container>
         <Content padder>
           <View style={[styles.inline, styles.bread_inline]}>
            <Text style={[styles.bread, styles.bread_active]}>{this.state.class_key.replace('*','/')}</Text>
           </View>

           <Text style={[styles.title, styles.insert_title]}>{this.state.class_key.replace('*','/')}</Text>
    
            <View style={styles.subclass_list}>
              <FlatList
                data={this.state.data}
                //need a data extractor here
                renderItem={({item}) => 
                  <ListItem noIndent style={styles.subclass_list_item}
                  			onPress={() => this._clickSubclass(item.key)}>
                    
                    <MaterialCommunityIcons name="circle-outline" style={styles.circle_icon}></MaterialCommunityIcons>  
                    <Text style={styles.subclass_list_item_text}>{item.value}</Text>  
                    
                 </ListItem>
              }
              />
            </View>
          </Content>
      </Container>
    );
  }
}