
/*
Framework usage:
 1. NativeBase (https://github.com/GeekyAnts/NativeBase)
 2. @expo/vector-icons (https://docs.expo.io/versions/latest/guides/icons/)
*/

import React, { Component } from 'react';
// import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Card, CardItem, Content, FooterTab, Icon, Footer } from 'native-base';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import Expo from "expo";
import Firebase, {FirebaseContext} from './Firebase';

import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import EStyleSheet from 'react-native-extended-stylesheet'; 
import styles from './style';

import {AccordionList} from "accordion-collapse-react-native";
import { Separator } from 'native-base';
import { AppLoading, Font } from 'expo';





const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CONTENT = [
  {
    title: 'Onset/Duration',
    content: BACON_IPSUM,
  },
  {
    title: 'Dose',
    content: BACON_IPSUM,
  },
  {
    title: 'Metabolism/Excretion',
    content: BACON_IPSUM,
  },
  {
    title: 'Warnings',
    content: BACON_IPSUM,
  },
];


async function getData(firebase){
  let snapshot = await firebase.drugsDbRef.once('value');
  let data = snapshot.val();
  return data;
}

export default class HeaderExample extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true, 
      data: null,
      activeSections: [],
      collapsed: true,
      multipleSelect: true,
      loaded: false,
    };
  }

  componentWillMount() {
    this._loadFontsAsync();
  }

   _loadFontsAsync = async () => {
    await Font.loadAsync({
      'Open-Sans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      'Open-Sans-SemiBold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
      'Open-Sans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'Open-Sans-Light': require('../assets/fonts/OpenSans-Light.ttf'),
      'Open-Sans-Italic': require('../assets/fonts/OpenSans-Italic.ttf'),
    });
    this.setState({loaded: true});
  }



  _setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  _renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        // duration={400}
        style={[styles.indication_header, isActive ? styles.indication_active : styles.indication_inactive]}
        transition="backgroundColor"
      >
        <Text style={[styles.indication_headerText,isActive ? styles.indication_header_active : styles.indication_header_inactive]}>{section.title}</Text>

      </Animatable.View>
    );
  };

  _renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={styles.indication_content}
        transition="backgroundColor"
      >
        <Animatable.Text>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  _renderIcon(){
    console.log('hello')
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




  render() {
    if (!this.state.loaded) {
      return <AppLoading />;
    }
    const { multipleSelect, activeSections } = this.state;

    return (


       <Container> 
         <Header style={styles.header}>
           <Left>
            <Button transparent>
              <Ionicons name="ios-arrow-back" size={32} color="#007FAE" />
            </Button>
          </Left>

          <Body>
            <Title>Durg References</Title>
          </Body>

          <Right>
            <Button transparent>
              <Ionicons name="ios-search" size={32} color="#007FAE" />
            </Button>
          </Right>
        </Header>
          

        <Content padder style={styles.body}>
          <View style={styles.inline}>
            <Text style={styles.drug_name}>Lorazepam
              <Text style={styles.brand_name}> (Ativan)</Text>
            </Text>
            <Right>
              <Button transparent>
              <TouchableOpacity onPress={() => this._renderIcon()}>
                  <Ionicons name="ios-checkmark-circle" style={styles.add_comparison} ></Ionicons>
               </TouchableOpacity>
               </Button>
             </Right>
           </View>
             <Text style={styles.subclass_name}>Benzodiazepines</Text>
  

          <Accordion
            // containerStyle={styles.container}
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            // duration={400}
            onChange={this._setSections}
          />
        </Content>

        <Footer>
          <FooterTab>
            <Button>
              <MaterialCommunityIcons name="pill" size={32} color="#007FAE" />
            </Button>
            <Button>
              <MaterialCommunityIcons name="file-compare" size={32} color="#007FAE" />
            </Button>
 
          </FooterTab>
        </Footer>
      </Container>
      
    );
  }
}

HeaderExample.contextType = FirebaseContext;