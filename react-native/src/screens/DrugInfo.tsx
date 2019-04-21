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

import {AccordionList} from "accordion-collapse-react-native";
import { Separator } from 'native-base';
import { AppLoading, Font } from 'expo';

import styles from '../style';
import { firebase } from '../utils/FirebaseWrapper';
// let itemsRef = firebase.database.ref('/drugs_test');
let itemsRef = firebase.database.ref('/drugs');


const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

export class DrugInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class_key: props.navigation.getParam('class_key',''),
      subclass_key: props.navigation.getParam('subclass_key',''),
      drug_key: props.navigation.getParam('drug_key',''),
      data: [],
      activeSections: [],
      collapsed: true,
      multipleSelect: true,
    };
  }

  getDrugInfo(){
    var content = [];
    itemsRef.on('value', snapshot =>{
        let data = snapshot.val();

        // slice out brand name and desciption
        let drug_info = data[this.state.class_key][this.state.subclass_key][this.state.drug_key];
        console.log(drug_info)

        // console.log(data[this.state.class_key][this.state.subclass_key][this.state.drug_key]['0'])

        let labels = data[this.state.class_key]['labels'];

        for (var i = 0; i < labels.length; i++) {
          let a = {title:JSON.stringify(labels[i]).replace(/\"/g, ""),content:JSON.stringify((drug_info[JSON.stringify(i)]==null) ? "Data not inserted":drug_info[JSON.stringify(i)] ).replace(/\"/g, "")};
          content.push(a);
        }
        // console.log(content);
        var drug_array = [];


     });
    return content;

    // const content = [
    //   {
    //     title: 'Onset/Duration',
    //     content: [{title2: 'hello',value2: 'hello'}, {title2: 'hello',value2: 'hello'}],
    //   },
    //   {
    //     title: 'Dose',
    //     content: [{title2: 'hello',value2: 'hello'}, {title2: 'hello',value2: 'hello'}],
    //   },
    //   {
    //     title: 'Metabolism/Excretion',
    //     content: [{title2: 'hello',value2: 'hello'}, {title2: 'hello',value2: 'hello'}],
    //   },
    //   {
    //     title: 'Warnings',
    //     content: [{title2: 'hello',value2: 'hello'}, {title2: 'hello',value2: 'hello'}],
    //   },
    // ];
    // this.setState({
    //   data: [...content],
    // })
    return content;
  }


  componentDidMount(){
    // this.getDrugInfo();
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
    return (
      <Animatable.View
        duration={400}
        style={styles.indication_content}
        transition="backgroundColor"
      >
      <Animatable.Text> {section.content} </Animatable.Text>
       

      </Animatable.View>
    );
  }

  _renderIcon(){
    // console.log(this.refs)
    return(
         <Ionicons name="ios-add-circle-outline" style={styles.add_comparison}></Ionicons>
      )
    // if (isActive){
    //   return(
    //      <Ionicons name="ios-checkmark-circle" style={styles.add_comparison} ></Ionicons>
    //   )
    // }else{
    //   return(
    //      <Ionicons name="ios-add-circle-outline" style={styles.add_comparison} ></Ionicons>
    //     )
    // }
  }


  // TODO
  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
       <Container>         

        <Content padder style={styles.body}>
          <View style={styles.inline}>
            <Text style={styles.title}>{this.state.drug_key}
              <Text style={styles.brand_name}> (Ativan)</Text>
            </Text>
            <Right>
              <Button transparent>
              <TouchableOpacity onPress={() => this._renderIcon()}>
                <Ionicons name="ios-checkmark-circle" style={styles.add_comparison}></Ionicons>
               </TouchableOpacity>
               </Button>
             </Right>
           </View>
           <Text style={styles.subclass_name}>Benzodiazepines</Text>
           
          <Accordion
            // containerStyle={styles.container}
            activeSections={activeSections}
            sections={this.getDrugInfo()}
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