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
     // const content = [{key: 'Alprazolam'}, {key: 'Chlordiazepoxide'}, {key: 'Clonazepam'},{key: 'Diazepam'},{key: 'Lorazepam'},{key: 'Midazolam'}, {key: 'Oxazepam'}, {key: 'Temazepam'}];
     // this.setState({
     //      data: [...this.state.data, ...content]
     //    });
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
                //need a data extractor here
                renderItem={({item}) => 
                  <ListItem noIndent style={styles.drug_list_item}
                            onPress={() => this._clickDrugList(item.key)}>
                    
                    <SimpleLineIcons name="plus" style={styles.add_icon}></SimpleLineIcons>  
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