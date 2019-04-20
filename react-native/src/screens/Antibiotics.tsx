import {
  Text,
  View,
  Switch,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Card, CardItem, Content, FooterTab, Icon, Footer, List, ListItem } from 'native-base';
import { Ionicons, MaterialCommunityIcons, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import SearchBar from 'react-native-search-bar'
import Search from 'react-native-search-box';
import AlphabetListView from 'react-native-alphabetlistview'


//Load Firebase
import { firebase } from '../utils/FirebaseWrapper';
let itemsRef = firebase.database.ref('/drugs');

import styles from '../style';



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
     itemsRef.on('value', snapshot =>{
        var data = snapshot.val();
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
                    <ListItem noIndent>          
                        <Text style={styles.category_item}>{item.value}</Text>                  
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