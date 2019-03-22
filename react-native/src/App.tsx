
/*
Framework usage:
 1. NativeBase (https://github.com/GeekyAnts/NativeBase)
 2. @expo/vector-icons (https://docs.expo.io/versions/latest/guides/icons/)
*/

import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Card, CardItem, Content, FooterTab, Icon, Footer } from 'native-base';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


import { Constants } from 'expo';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import EStyleSheet from 'react-native-extended-stylesheet'; 

import {AccordionList} from "accordion-collapse-react-native";
import { Separator } from 'native-base';
import { AppLoading, Font } from 'expo';

import styles from './style';
import {db} from './config/firebase';
let itemsRef = db.ref('/drugs');




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


export default class HeaderExample extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      data: null,
      activeSections: [],
      collapsed: true,
      multipleSelect: true,
      font_loaded: false,
    };
  }

  state = {
    items: []
  };

  makeContents() {
      let loaded = !!this.state.items;
      const content = [
      {
        title: 'Onset/Duration',
        content: loaded ? this.state.items['0']['_coordinate'] : BACON_IPSUM,
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

    return content;
  }

  componentDidMount(){
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
      console.log(this.state.items['0']['_coordinate']) 
    });
  }


  componentWillMount() {
    console.log(itemsRef);
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
    this.setState({font_loaded: true});
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
        <Animatable.Text>
          {section.content}
        </Animatable.Text>
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




  render() {
    if (!this.state.font_loaded) {
      return <AppLoading />;
    }
    const { multipleSelect, activeSections } = this.state;
    console.log(this.state.items)

    return (
       <Container> 
         <Header style={styles.header}>
           <Left>
            <Button transparent>
              <Ionicons name="ios-arrow-back" style={styles.header_icon} />
            </Button>
          </Left>

          <Body style={styles.header_text_box}>
            <Title style={styles.header_text}>Durg References</Title>
          </Body>

          <Right>
            <Button transparent>
              <Ionicons name="ios-search" style={styles.header_icon} />
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
                <Ionicons name="ios-checkmark-circle" style={styles.add_comparison}></Ionicons>
               </TouchableOpacity>
               </Button>
             </Right>
           </View>
           <Text style={styles.subclass_name}>Benzodiazepines</Text>
           
          <Accordion
            // containerStyle={styles.container}
            activeSections={activeSections}
            sections={this.makeContents()}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            // duration={400}
            onChange={this._setSections}
          />
        </Content>

        <Footer style={styles.footer}>
          <FooterTab>
            <Button>
              <MaterialCommunityIcons name="pill" style={styles.footer_icon} />
            </Button>
            <Button>
              <MaterialCommunityIcons name="file-compare" style={styles.footer_icon} />
            </Button>
 
          </FooterTab>
        </Footer>
      </Container>
      
    );
  }
}