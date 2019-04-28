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


//Load Firebase
import { firebase } from '../utils/FirebaseWrapper';
let itemsRef = firebase.database.ref('/drugs');

import styles from '../style';

export class DrugList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      class_key: props.navigation.getParam('class_key',''),
      subclass_key: props.navigation.getParam('subclass_key',''),
      data: [],
      selected: false,
    };
  }

  // search1: SearchBar

  componentDidMount() {
    this.getDrugList();
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
          data: [...drug_array]
        });

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
                    
                  <Button transparent>
                    <TouchableOpacity onPress={() => this._changeIcon()}>
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