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



class SectionHeader extends Component {
  render() {
    // inline styles used for brevity, use a stylesheet when possible
    var textStyle = {
      textAlign:'center',
      color:'#fff',
      fontWeight:'700',
      fontSize:16
    };

    var viewStyle = {
      backgroundColor: '#ccc'
    };
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

class SectionItem extends Component {
  render() {
    return (
      <Text style={{color:'#f00'}}>{this.props.title}</Text>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <View style={{height:30}}>
        <Text>{this.props.item}</Text>
      </View>
    );
  }
}


export class Antibiotics extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      class_key: 'Antibiotics And Organisms',
      subclass_key: 'Antibiotics',
      data: {
        // {title: 'Title1', data: ['item1', 'item2']},
        // {title: 'Title2', data: ['item3', 'item4']},
        // {title: 'Title3', data: ['item5', 'item6']},
        A: ['some','entries','are here'],
        B: ['some','entries','are here'],
        C: ['some','entries','are here'],
        D: ['some','entries','are here'],
        E: ['some','entries','are here'],
        F: ['some','entries','are here'],
        G: ['some','entries','are here'],
        H: ['some','entries','are here'],
        I: ['some','entries','are here'],
        J: ['some','entries','are here'],
        K: ['some','entries','are here'],
        L: ['some','entries','are here'],
        M: ['some','entries','are here'],
        N: ['some','entries','are here'],
        O: ['some','entries','are here'],
        P: ['some','entries','are here'],
        Q: ['some','entries','are here'],
        R: ['some','entries','are here'],
        S: ['some','entries','are here'],
        T: ['some','entries','are here'],
        U: ['some','entries','are here'],
        V: ['some','entries','are here'],
        W: ['some','entries','are here'],
        X: ['some','entries','are here'],
        Y: ['some','entries','are here'],
        Z: ['some','entries','are here'],
      }
    };
  }

  // search1: SearchBar

  componentDidMount() {
    // this.getDrugList();
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

            

           <AlphabetListView
              data={this.state.data}
              cell={Cell}
              cellHeight={30}
              sectionListItem={SectionItem}
              sectionHeader={SectionHeader}
              sectionHeaderHeight={22.5}
            />

            </View>
          </Content>
      </Container>
    );
  }
}