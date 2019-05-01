import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, ListItem, Card, CardItem, Content, FooterTab, Icon, Footer } from 'native-base';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Constants } from 'expo';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import EStyleSheet from 'react-native-extended-stylesheet'; 

import { AccordionList } from "accordion-collapse-react-native";
import { Separator } from 'native-base';
import { AppLoading, Font } from 'expo';

import styles from '../style';

const Cache = require('global-cache');

export class Antibiotics extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      class_key: 'Antibiotics And Organisms',
      subclass_key: 'Antibiotics',
      data: [],
    };
  }

  // search1: SearchBar

  componentDidMount() {
    this.getAntibiotics();
  }

  async getAntibiotics(){
    Cache.get('is_data_loaded').then(() => {
        var data = Cache.get('drugs_data');
        var data_output = [];
        var antibiotics = Object.keys(data[this.state.class_key][this.state.subclass_key]);
          antibiotics.forEach(function(value){
            let single_item = {key: value, value:value}
            data_output.push(single_item);
          })
          this.setState({
            data: [...data_output],
          });

     });
  }

  _clickItem(item){
    this.props.navigation.navigate('AntibioBac',{class_key: this.state.class_key, subclass_key: this.state.subclass_key, item_key: item });
  }
 
  render() {
    return (
       <Container>
         <Content padder>
           <Text style={styles.title}>{(this.state.subclass_key == '_') ? this.state.class_key:this.state.subclass_key}</Text>
           <View>
            <Text style={styles.switch}
                   onPress={() => this.props.navigation.navigate('Bacteria')}>Switch to bacteria search</Text>
            <FlatList
                data={this.state.data}
               // Nested flatlist
                renderItem={({item}) => 
                  <View>
                    <ListItem noIndent onPress={() => this._clickItem(item.key)}>          
                        <Text style={styles.category_item}>{item.value.replace('*','/')}</Text>                  
                    </ListItem>           
                  </View>
               }

               keyExtractor={(item, index) => index.toString()}
             />    
          </View>
        </Content>
      </Container>
    );
  }
}