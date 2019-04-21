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



export class Bacteria extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      class_key: 'Antibiotics And Organisms',
      subclass_key: 'Bacteria',
    };
  }

  // search1: SearchBar

  componentDidMount() {
    this.getBacteriaList();
  }

  async getBacteriaList(){
     itemsRef.on('value', snapshot =>{
        var data = snapshot.val();
        var data_output = [];
        var bacterias = data[this.state.class_key][this.state.subclass_key];
        var header_names = Object.keys(bacterias);    
        
        // Reorganize data into an array of dictionary
        header_names.forEach(function(value){
          var items = Object.keys(bacterias[value]);
          var items_array = [];
          items.forEach(function(item){
            var tmp = {item: item};
            items_array.push(tmp);
          })

          let single_category = {header: value, value: items_array};
          data_output.push(single_category);

        });

        console.log(data_output)
        this.setState({
          data: [...data_output],
        });
     });
  }


  renderList(){
      return(
        <View>
          <Text style={styles.switch} 
               onPress={() => this.props.navigation.navigate('Antibiotics')}>Switch to antibiotics search</Text>
          <View style={styles.drug_list}>
                <FlatList
                  data={this.state.data}
                  renderItem={({item}) => 
                    <View>
                      <ListItem itemDivider style = {styles.divider}>          
                          <Text style={styles.divider_content}>{item.header}</Text>
                      </ListItem>
                      <FlatList
                        data={item.value}
                       // Nested flatlist
                        renderItem={({item}) => 
                          <View>
                            <ListItem noIndent>          
                                <Text style={styles.category_item}>{item.item}</Text>                  
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
            </View>
        )
  }

  
  render() {
    return (
       <Container>
         <Content padder>
           <Text style={styles.title}>{(this.state.subclass_key == '_') ? this.state.class_key:this.state.subclass_key}</Text>
             <View>
              <Text style={styles.switch} 
                    onPress={() => this.props.navigation.navigate('Antibiotics')}>Switch to antibiotics search</Text>
              <View style={styles.drug_list}>
                  <FlatList
                    data={this.state.data}
                    renderItem={({item}) => 
                     <View>
                        <ListItem itemDivider style = {styles.divider}>          
                            <Text style={styles.divider_content}>{item.header}</Text>
                        </ListItem>
                        <FlatList
                          data={item.value}
                         // Nested flatlist
                          renderItem={({item}) => 
                            <View>
                              <ListItem noIndent>          
                                  <Text style={styles.category_item}>{item.item}</Text>                  
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
            </View>
          </Content>
      </Container>
    );
  }
}