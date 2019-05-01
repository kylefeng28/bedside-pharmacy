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
import { NavigationScreenProp } from 'react-navigation';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Card, CardItem, Content, FooterTab, Icon, Footer, List, ListItem, Item, Input} from 'native-base';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Search from 'react-native-search-box';
import * as SearchUtil from '../utils/SearchUtil';
import AtoZListView from 'react-native-atoz-listview';

import { SearchBar } from 'react-native-elements';

import styles from '../style';
import { DrugList } from './DrugList';

// var cache = require('global-cache');
// import { Cache } from "global-cache";
const Cache = require('global-cache');

const rowHeight = 40;

export class ClassList extends Component {

  static navigationOptions = {
    header: null
  }
  props: {
    navigation: NavigationScreenProp<any, any>
  }
  state: {
    data: any[],
    searchResult: any[],
    onSearch: boolean,
    showClassList: boolean,
  }

  constructor(props) {
    super(props);
    this.props = props; // not necessarily but needed to get ts-jest to shut up

    this.state = {
      data: [],
      searchResult: [],
      onSearch: false,
      showClassList: true,
    };

    Cache.set("selected", []);
  }

  componentDidMount() {
    this.getClassList();
  }

    // NOTE: must be async (or return a Promise)
  async _onSearch(searchText: string) {
    const searchResults = SearchUtil.search(searchText);
    this.setState({
      searchResult: searchResults,
      onSearch: true,
      showClassList: false
    });
  }

  _cancelSearch(){
    this.setState({ 
      onSearch: false, 
      searchResult:[],
      showClassList: true,
    });
  }

  getClassList() {
    Cache.get('is_data_loaded').then(() => {
      let data = Cache.get('drugs_data');
      SearchUtil.loadRawData(data);
      let class_names = Object.keys(data);
      var class_array: any = [];

      // Replace '*' with '/' for class value
      for (let i = 0; i < class_names.length; i++) {
        let a = { key: JSON.stringify(class_names[i]).replace(/\"/g, ""), value: JSON.stringify(class_names[i]).replace(/\"/g, "").replace('*', ' / ') };
        class_array.push(a);
      }

      this.setState({
        data: [...class_array]
      });
    });
  }

  _clickClass(class_key){
    Cache.get('is_data_loaded').then(() => {
      let data = Cache.get('drugs_data');

      // slice the last element as it is the label info as default
      let subclass_key = Object.keys(data[class_key])[0];

      if(class_key === 'Antibiotics And Organisms'){
        this.props.navigation.navigate('ToAntibiotics')
      } else if (subclass_key === '_'){
        this.props.navigation.navigate('ToDrugList',{class_key: class_key, subclass_key: subclass_key });
      }else{ 
        this.props.navigation.navigate('ToSubclass',{class_key: class_key});
      }

    });

  };

  _clickResult(path){
    if(path.length == 1){
       this.props.navigation.navigate('ToSubclass',{class_key: path[0]});
     } else if (path.length == 2){
      this.props.navigation.navigate('ToDrugList',{class_key: path[0], subclass_key: path[1] });
     } else if(path.length == 3){
       this.props.navigation.navigate('ToDrugInfo',{class_key: path[0], subclass_key: path[1], drug_key: path[2]});
    }
  }


  // render result item when on search and hide when not
  _renderResult(){
    if(this.state.onSearch){

      return(
        <ScrollView style={styles.result_box}>
          <FlatList
              data={this.state.searchResult}
              renderItem={({item}: {item: any}) => 
                <ListItem noIndent
                    onPress={() => this._clickResult(item.path)}>          
                    <Text style={styles.result_title}>{item.name}</Text>
                    <Text style={styles.result_path}>  in </Text>
                    <Text style={styles.result_path}>{item.path[0]}</Text>
               </ListItem>
             }
            />

        </ScrollView>
         )
      }
    }

   _renderClassList(){
     if(this.state.showClassList){
       return(
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
         )
     }
   }

  render() {
    return (
       <Container>
         <Content padder>
           <Text style={[styles.title,styles.main_title]}>Bedside <Text style={styles.title_light}>Pharmacist</Text></Text>

           <View style={styles.seach_box}>
             <Search
                ref='search_box'
                backgroundColor= '#FFFFFF'
                cancelTitle='Cancel'     
                titleCancelColor='#007FAE'
                tintColorSearch='#151515'
                inputHeight={40}
                iconCancel = {<Entypo name="circle-with-cross" style={styles.search_icon}></Entypo>}
                middleWidth = {100}
                // onFocus = {() => this.setState({ onSearch: true})}
                onCancel = {() => this._cancelSearch()}
                onChangeText = {(searchText) => this._onSearch(searchText)}
              />
            </View>
            <View>{this._renderResult()}</View>

            <View>{this._renderClassList()}</View>
            
          </Content>
      </Container>
    );
  }
}
