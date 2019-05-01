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
import { Ionicons, MaterialCommunityIcons, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import SearchBar from 'react-native-search-bar'
import Search from 'react-native-search-box';


import styles from '../style';
import { createNavigationContainer } from 'react-navigation';

const Cache = require('global-cache');

export class DrugList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      class_key: props.navigation.getParam('class_key',''),
      subclass_key: props.navigation.getParam('subclass_key',''),
      // class_key: "Antiacid",
      // subclass_key: "_",
      data: [],
      selected: false,
    };

    // console.log(Cache.set("selected", ["one"]))
    // console.log(Cache.get("selected"));
  }

  // search1: SearchBar

  componentDidMount() {
    this.getDrugList();
  }

  componentDidUpdate() {
    console.log(this.state.selected);
  }

   getDrugList(){
     Cache.get('is_data_loaded').then(() => {
        let data = Cache.get('drugs_data');
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

  _changeIcon(){
    console.log(this.state.selected)
    this.setState({
      selected: !this.state.selected
    })
  }

  _renderIcon(){
    if (this.state.selected){ 
      return(
         <Ionicons name="ios-checkmark-circle" style={[styles.selected_comparison, styles.add_icon]} ></Ionicons>
      )
    }else{
      return(
         <SimpleLineIcons name="plus" style={styles.add_icon}></SimpleLineIcons>
        )
    }

  }

  _clickDrugList(drug_key){
    this.props.navigation.navigate('DrugInfo',{class_key: this.state.class_key, subclass_key: this.state.subclass_key, drug_key: drug_key});
  };

  _renderIcon() {
    console.log(this.state.selected);
    if (this.state.selected) {
      return (<Ionicons name="ios-checkmark-circle"></Ionicons>)
    } else {
      return (<SimpleLineIcons name="plus" style={styles.add_icon}></SimpleLineIcons>)
    }
  }

  _changeIcon(class_key, subclass_key, item_key) {
    // if (subclass_key === undefined) {
    //   subclass_key = "_";
    // }

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
      // console.log(Cache.get("selected"));
    } else { // add
      var temp = Cache.get("selected");
      temp.push([class_key, subclass_key, item_key]);
      Cache.set("selected", temp);
      // console.log(Cache.get("selected"));
    }

    this.setState({
      selected: !this.state.selected
    })
    // this._renderIcon();
    // this.render();
    // this.forceUpdate();
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
                    
                    {/* <SimpleLineIcons name="plus" style={styles.add_icon}></SimpleLineIcons>   */}

                    <Button transparent>
                    <TouchableOpacity onPress={() => this._changeIcon(this.state.class_key, this.state.subclass_key, item.key)}>
                      {this._renderIcon()}
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