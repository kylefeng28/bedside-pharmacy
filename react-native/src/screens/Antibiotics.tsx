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
      subclass_key: 'Bacteria',
      data: [
        // {header: 'Title1', value: [{item:'item5'}, {item:'item2'}, {item:'item2'}]},
        // {header: 'Title2', value: [{item:'item1'}, {item:'item2'}]},
        // {header: 'Title3', value: [{item:'item1'}, {item:'item2'}]},
      ],
      data_loaded: false,
    };
  }

  // search1: SearchBar

  componentDidMount() {
    this.getAntibioticsList();
  }

  async getAntibioticsList(){
     itemsRef.on('value', snapshot =>{
        var data = snapshot.val();
        var bacterias = data[this.state.class_key][this.state.subclass_key];
        var header_names = Object.keys(bacterias);
        
        var data_output = [];
        header_names.forEach(function(value){
          var items = Object.keys(bacterias[value]);
          var items_array = [];
          items.forEach(function(item){
            var tmp = {item: item}
            items_array.push(tmp);
          })
          let single_category = {header: value, value: items_array};
          data_output.push(single_category);
        });

        this.setState({
          data: [...data_output]
        });

     });
  }


  _clickDrugList(drug_key){
    this.props.navigation.navigate('DrugInfo',{class_key: this.state.class_key, subclass_key: this.state.subclass_key, drug_key: drug_key});
  };


  

  render() {
    return (
       <Container>
         <Content padder>
           <Text style={styles.title}>{(this.state.subclass_key == '_') ? this.state.class_key:this.state.subclass_key}</Text>
            <View style={styles.drug_list}>
              <FlatList
                data={this.state.data}
                renderItem={({item}) => 
                  <View>
                    <ListItem itemDivider>          
                        <Text style={styles.result_title}>{item.header}</Text>
                    </ListItem>
                    <FlatList
                      data={item.value}
                     // Nested flatlist
                      renderItem={({item}) => 
                        <View>
                          <ListItem noIndent>          
                              <Text style={styles.result_title}>{item.item}</Text>                  
                          </ListItem>
                          
                        </View>
                     }
                     keyExtractor={(item, index) => index.toString()}
                    />   
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