import {
  Text,
  View,
  Switch,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Card, CardItem, Content, FooterTab, Icon, Footer, List, ListItem } from 'native-base';
import { Ionicons, MaterialCommunityIcons, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import SearchBar from 'react-native-search-bar'
import Search from 'react-native-search-box';


//Load Firebase
import { firebase } from '../utils/FirebaseWrapper';
let itemsRef = firebase.database.ref('/drugs');

import styles from '../style';
import { createNavigationContainer } from 'react-navigation';

var Cache = require('global-cache');

export class DrugList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      class_key: props.navigation.getParam('class_key',''),
      subclass_key: props.navigation.getParam('subclass_key',''),
      data: [],
      selected: Cache.get("selected"),
    };

  }

  componentDidMount() {
    this.getDrugList();
  }

  componentDidUpdate() {
    console.log(this.state.selected);
  }

   getDrugList(){
     itemsRef.on('value', snapshot =>{
        let data = snapshot.val();
        let drug_names = Object.keys(data[this.state.class_key][this.state.subclass_key]);
        var drug_array = [];

        for (var i = 0; i < drug_names.length; i++) {
          let a = {key:JSON.stringify(drug_names[i]).replace(/\"/g, ""),value:JSON.stringify(drug_names[i]).replace(/\"/g, "")};
          drug_array.push(a);
        }

        this.setState({
          data: [...drug_array],
        });

        // console.log(data);

     });
  }

  _clickDrugList(drug_key){
    this.props.navigation.navigate('DrugInfo',{class_key: this.state.class_key, subclass_key: this.state.subclass_key, drug_key: drug_key});
  };

  _renderIcon(item_key) {
    var exists = false;
    for (var i=0; i<Cache.get("selected").length; i++) {
      if (Cache.get("selected")[i][2] == item_key) {
        exists = true;
      }
    }

    // console.log(this.state.selected);
    if (exists) {
      // return (<SimpleLineIcons name="check" style={styles.add_icon}></SimpleLineIcons>)
      return (<Ionicons name="ios-checkmark-circle" style={styles.selected_comparison} ></Ionicons>)
    } else {
      return (<SimpleLineIcons name="plus" style={styles.add_icon}></SimpleLineIcons>)
    }
  }

  _changeIcon(class_key, subclass_key, item_key) {
    // check cache - if exists: remove; else: add to cache
    var exists = false;
    var idx = 0;
    for (var i=0; i<Cache.get("selected").length; i++) {
      if (Cache.get("selected")[i][2] == item_key) {
        exists = true;
        idx = i;
      }
    }

    if (exists) { // get rid
      var temp = Cache.get("selected");
      temp.splice(idx, 1);
      Cache.set("selected", temp);
    } else { // add
      var temp = Cache.get("selected");

      // check if already have 4 drugs in selected
      if (temp.length == 4) {
        Alert.alert("Already selected maximum amount of drugs for comparison.")
      } else {
        // check if classes match
        if (temp.length > 0) {
          if (temp[0][0] == class_key) {
            temp.push([class_key, subclass_key, item_key]);
            Cache.set("selected", temp);
          } else {
            Alert.alert("Could not add selected drug because is not within the same class.")
          }
        } else {
          temp.push([class_key, subclass_key, item_key]);
          Cache.set("selected", temp);
        }
      }

    }

    this.setState({
      selected: Cache.get("selected")
    })
  }

  render() {
    return (
       <Container>
         <Content padder>
          <View style={[styles.inline, styles.bread_inline]}>
            <Text style={[styles.bread, styles.bread_active]}>{this.state.class_key.replace('*','/')}</Text>
            <Text style={[styles.bread]}>{this.state.subclass_key == '_'? "" : ' • ' + this.state.subclass_key}</Text>
           </View>
           <Text style={[styles.title, styles.insert_title]}>{(this.state.subclass_key == '_') ? this.state.class_key:this.state.subclass_key}</Text>
         
            <View style={styles.drug_list}>
              <FlatList
                data={this.state.data}
                //need a data extractor here
                renderItem={({item}) => 
                  <ListItem noIndent style={styles.drug_list_item}
                            onPress={() => this._clickDrugList(item.key)}>
                    
                    {/* <SimpleLineIcons name="plus" style={styles.add_icon}></SimpleLineIcons> */}

                    <Button transparent>
                    <TouchableOpacity onPress={() => this._changeIcon(this.state.class_key, this.state.subclass_key, item.key)}>
                      {this._renderIcon(item.key)}
                    </TouchableOpacity>
                    </Button>

                    <Text style={styles.drug_list_item_text}>{item.value}</Text>  
                 </ListItem>
              }
              />
            </View>
          </Content>
      </Container>
    );
  }
}