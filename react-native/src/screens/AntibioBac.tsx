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
import { firebase } from '../utils/FirebaseWrapper';
// let itemsRef = firebase.database.ref('/drugs_test');
let itemsRef = firebase.database.ref('/drugs');



export class AntibioBac extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class_key: 'Antibiotics And Organisms',
      subclass_key: 'Antibiotics',
      drug_key: 'Amikacin',
      breadcum: [],
      data: [],
      description: "",
      active: [],
      recommend:[],
      selected: false,
      activeSections: [],
      collapsed: false,
      multipleSelect: true,
    };
  }

  getData(){
    var content = [];
    itemsRef.on('value', snapshot =>{
        let data = snapshot.val();

        let category_info = data[this.state.class_key][this.state.subclass_key][this.state.drug_key];
        
        let recommend = {title: 'Recommend',content: category_info['Recommended']};
        let active = {title: 'Active', content: category_info['Active']};
        
        content.push(recommend);
        content.push(active);

        this.setState({
          data: content,     
        })

     });
  }

  renderData(){   
    var content = [];
    content = this.state.data;
    // itemsRef.on('value', snapshot =>{
    //     let data = snapshot.val();

    //     // slice out brand name and desciption
    //     // let drug_info = data[this.state.class_key][this.state.subclass_key][this.state.drug_key];

    //     // let labels = data[this.state.class_key]['labels'];

    //     for (var i = 0; i < 2; i++) {
    //       let a = {title:'heel',content:'go'};
    //       content.push(a);
    //     }

    //  });
    return content;
  }


  componentDidMount(){
    this.getData();
    // this.renderData();
  }

  _setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  _renderHeader = (section, _, isActive) => {
    // console.log(section);
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _renderContent(section, _, isActive) {
    // console.log(section);
    return (
    //   <View
    //     // duration={400}
    //     style={[styles.indication_header, isActive ? styles.indication_active : styles.indication_inactive]}
    //     transition="backgroundColor"
    //   >
    //     <Text style={[styles.indication_headerText,isActive ? styles.indication_header_active : styles.indication_header_inactive]}>{section.title}</Text>

    //   </View>
    // );
    // var content = JSON.parse(section.content);
    // var subtitles = Object.keys(content);
    // var spec = Object.values(content);
    // var output = [];
    // for (let i = 0; i< subtitles.length; i++){
    //   var item = (
    //     <View key = {100-i}>
    //       <Text key={i} style={styles.accordion_subtitle}>{(subtitles[i] == '_') ? "" : subtitles[i]}</Text>
    //       <Text key={-1-i} style={styles.accordion_spec}>{spec}</Text>
    //     </View>
    //     );
    //   output.push(item);
    // }
    // return (
      <Animatable.View
        duration={400}
        style={styles.indication_content}
        transition="backgroundColor"
      >
      <Text> {section.content} </Text>
      </Animatable.View>
    );
  }

  _changeIcon(){
    this.setState({
      selected: !this.state.selected
    })
  }

  _renderIcon(){
    if (this.state.selected){ 
      return(
         <Ionicons name="ios-checkmark-circle" style={styles.selected_comparison} ></Ionicons>
      )
    }else{
      return(
         <Ionicons name="ios-add-circle-outline" style={styles.add_comparison} ></Ionicons>
        )
    }

  }


  // TODO
  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
       <Container>         

        <Content padder style={styles.body}>
          <View style={styles.inline}>
            <Text style={styles.title}>{this.state.drug_key}
              <Text style={styles.brand_name}>{this.state.active}</Text>
            </Text>
            <Right>
              <Button transparent>
              <TouchableOpacity onPress={() => this._changeIcon()}>
                {this._renderIcon()}
               </TouchableOpacity>
               </Button>
             </Right>
           </View>

         <Accordion
          // containerStyle={styles.container}
          activeSections={this.state.activeSections}
          sections={this.renderData()}
          touchableComponent={TouchableOpacity}
          expandMultiple={multipleSelect}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          // duration={400}
          onChange={this._setSections}
        />     
        </Content>


      </Container>
      
    );
  }
}