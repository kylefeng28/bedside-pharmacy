import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, ListItem, Card, CardItem, Content, FooterTab, Icon, Footer } from 'native-base';
import { SimpleLineIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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

var Cache = require('global-cache');

export class DrugInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class_key: props.navigation.getParam('class_key',''),
      subclass_key: props.navigation.getParam('subclass_key',''),
      drug_key: props.navigation.getParam('drug_key',''),
      breadcrumb: [],
      description: "",
      brand: "",
      // selected: false,
      selected: Cache.get("selected"),
      activeSections: [],
      collapsed: false,
      multipleSelect: true,
    };
  }

  getDescription(){
    itemsRef.on('value', snapshot =>{
        let data = snapshot.val();

        // slice out brand name and desciption
        let drug_info = data[this.state.class_key][this.state.subclass_key][this.state.drug_key];
        let drug_description = drug_info['Description'];
        let drug_brand = drug_info['Brand Name'];
        this.setState({
          description:  drug_description,
          brand: drug_brand     
        })

     });
  }

  getDrugInfo(){
    var content = [];
    itemsRef.on('value', snapshot =>{
        let data = snapshot.val();

        // slice out brand name and desciption
        let drug_info = data[this.state.class_key][this.state.subclass_key][this.state.drug_key];

        let labels = data[this.state.class_key]['labels'];

        for (var i = 0; i < labels.length; i++) {
          let a = {title:JSON.stringify(labels[i]).replace(/\"/g, ""),content:JSON.stringify((drug_info[JSON.stringify(i)]==null) ? " ":drug_info[JSON.stringify(i)] )};
          content.push(a);
        }

     });

    return content;
  }


  componentDidMount(){
    this.getDescription();
  }

  _setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  _renderHeader = (section, _, isActive) => {
    return (
      <View
        // duration={400}
        style={[styles.indication_header, isActive ? styles.indication_active : styles.indication_inactive]}
        transition="backgroundColor"
      >
        <Text style={[styles.indication_headerText,isActive ? styles.indication_header_active : styles.indication_header_inactive]}>{section.title}</Text>

      </View>
    );
  };

  _renderContent(section, _, isActive) {
    var content = JSON.parse(section.content);
    var subtitles = Object.keys(content);
    var spec = Object.values(content);
    console.log(spec);
    var output = [];
    for (let i = 0; i< subtitles.length; i++){
      var item = (
        <View key = {100-i}>
          <Text key={i} style={styles.accordion_subtitle}>{(subtitles[i] == '_') ? "" : subtitles[i].replace('*','/')}</Text>
          <Text key={-1-i} style={styles.accordion_spec}>{spec}</Text>
        </View>
        );
      output.push(item);
    }
    return (
      <Animatable.View
        duration={400}
        style={styles.indication_content}
        transition="backgroundColor"
      >

      {output}
     
      </Animatable.View>
    );
  }

  _changeIcon(class_key, subclass_key, item_key){
    // this.setState({
    //   selected: !this.state.selected
    // })

    var exists = false;
    var idx = 0;
    for (var i=0; i<Cache.get("selected").length; i++) {
      if (Cache.get("selected")[i][2] == item_key) {
        exists = true;
        idx = i;
      }
    }

    if (exists) { // get rid
      var temp = Cache.get("selected");
      temp.splice(idx, 1);
      Cache.set("selected", temp);
      // console.log(Cache.get("selected"));
    } else { // add
      var temp = Cache.get("selected");

      // check if already have 4 drugs in selected
      if (temp.length == 4) {
        Alert.alert("Already selected maximum amount of drugs for comparison.")
      } else {
        // check if classes match
        if (temp.length > 0) {
          if (temp[0][0] == class_key) {
            temp.push([class_key, subclass_key, item_key]);
            Cache.set("selected", temp);
          } else {
            Alert.alert("Could not add selected drug because is not within the same class.")
          }
        } else {
          temp.push([class_key, subclass_key, item_key]);
          Cache.set("selected", temp);
        }
      }

      // console.log(Cache.get("selected"));
    }

    this.setState({
      selected: Cache.get("selected")
    });
  }

  _renderIcon(item_key){
    console.log("egg");

    var exists = false;
    for (var i=0; i<Cache.get("selected").length; i++) {
      if (Cache.get("selected")[i][2] == item_key) {
        exists = true;
      }
    }

    // console.log(this.state.selected);
    if (exists) {
      // return (<SimpleLineIcons name="check" style={styles.add_icon}></SimpleLineIcons>)
      return (<Ionicons name="ios-checkmark-circle" style={styles.selected_comparison} ></Ionicons>)
    } else {
      return (<SimpleLineIcons name="plus" style={styles.add_icon}></SimpleLineIcons>)
    }

  }


  // TODO
  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
       <Container>         

        <Content padder style={styles.body}>
        <View style={[styles.inline, styles.bread_inline]}>
          <Text style={styles.bread}>{this.state.class_key +' • '}</Text>
          <Text style={styles.bread}>{this.state.subclass_key == '_'? "" : this.state.subclass_key +' • '}</Text>
          <Text style={[styles.bread, styles.bread_active]}>{this.state.drug_key}</Text>
         </View>
          <View style={styles.inline}>
            <Text style={[styles.title, styles.insert_title]}>{this.state.drug_key}
              <Text style={styles.brand_name}>{' (' + this.state.brand +')'}</Text>
            </Text>
            <Right>
              <Button transparent>
              <TouchableOpacity onPress={() => this._changeIcon(this.state.class_key, this.state.subclass_key, this.state.drug_key)}>
                {this._renderIcon(this.state.drug_key)}
              </TouchableOpacity>
              </Button>
             </Right>
           </View>
           <Text style={styles.description_name}>{this.state.description}</Text>
           
          <Accordion
            activeSections={this.state.activeSections}
            sections={this.getDrugInfo()}
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