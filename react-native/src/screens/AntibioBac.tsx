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
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

import styles from '../style';
import { firebase } from '../utils/FirebaseWrapper';
let itemsRef = firebase.database.ref('/drugs');



export class AntibioBac extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class_key: props.navigation.getParam('class_key',''),
      subclass_key: props.navigation.getParam('subclass_key',''),
      header_key : props.navigation.getParam('header_key', ''), //only applicable to bacteria
      item_key: props.navigation.getParam('item_key',''),
      breadcum: [],
      data: [],
      description: "",
      activeSections: [0, 1],
      multipleSelect: true,
    };
  }

  getData(){

    var content = [];
    itemsRef.on('value', snapshot =>{
        let data = snapshot.val();

        // Antibiotics and Bacteria data structure are slightly different
        // Bacteria has an extra layer of header information
        if(this.state.subclass_key == 'Antibiotics'){
          var category_info = data[this.state.class_key][this.state.subclass_key][this.state.item_key];
        }else{
          var category_info = data[this.state.class_key][this.state.subclass_key][this.state.header_key][this.state.item_key];
        }

        let recommend_list = category_info['Recommended']
        let active_list = category_info['Active']
        if (recommend_list == null){
           var recommend = {title: 'Recommend',content: ['None'], subclass: this.state.subclass_key};
        }else{
           var recommend = {title: 'Recommend',content: recommend_list, subclass: this.state.subclass_key};
        }

        if (active_list == null){
          var active = {title: 'Active', content:['None'], subclass: this.state.subclass_key};
        } else {
          var active = {title: 'Active', content: active_list, subclass: this.state.subclass_key};
        }
 
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
    return content;
  }


  componentDidMount(){
    this.getData();  
  }

  _setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  _renderHeader = (section, _, isActive) => {
    return (
      <View style={[styles.indication_header, isActive ? styles.indication_active : styles.indication_inactive]}
        transition="backgroundColor"
      >
        <Text style={[styles.indication_headerText,isActive ? styles.indication_header_active : styles.indication_header_inactive]}>{section.title}</Text>
      </View>
    );
  };

  _renderContent(section, _, isActive) {
    var list = []
    for (let i = 0; i < section.content.length; i++){
      let tmp = {key: 'key'+i, value: section.content[i]}
      list.push(tmp);
    }
    return (
      <Animatable.View
        duration={400}
        style={styles.indication_content}
        transition="backgroundColor"
      >

        <FlatList
          data={list}
          renderItem={({item}) => 
            <View style={styles.antibioBac_list}>
              {section.subclass =='Antibiotics'? <FontAwesome name="bug" style={styles.antiboBac_icon}></FontAwesome> : <MaterialCommunityIcons name='pill' style={styles.antiboBac_icon}></MaterialCommunityIcons> }
              <Text style={styles.drug_list_item_text}>{item.value.replace('*','/').replace('*',' / ')}</Text>
            </View>  
          }
        />
     
      </Animatable.View>
    );
  }


  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
       <Container>         

        <Content padder style={styles.body}>
          <View style={styles.inline}>
            <Text style={styles.title}>{this.state.item_key.replace('*','/').replace('^','.')}
              <Text style={styles.brand_name}>{this.state.active}</Text>
            </Text>
           </View>
           <Text style={styles.description_name}>{this.state.subclass_key.replace('*','/')}</Text>
           <Accordion
            activeSections={this.state.activeSections}
            sections={this.renderData()}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._setSections}
          />     
      </Content>


      </Container>
      
    );
  }
}