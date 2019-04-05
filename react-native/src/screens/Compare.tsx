import {
  Text,
  View,
  Switch,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Picker
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Card, CardItem, Content, FooterTab, Icon, Footer, List, ListItem } from 'native-base';
import { Ionicons, MaterialCommunityIcons, Entypo, SimpleLineIcons} from '@expo/vector-icons';

import styles from '../style';

// let colors = ['#d9b3ff', '#b3e0ff'];
let colors = ['#ffffff', '#f2f2f2']

export class Compare extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  // search1: SearchBar

  componentDidMount() {
   
  }

 
  

  render() {
    return (
       <Container>
          <Content padder>
            <View style={{paddingLeft: 15, paddingRight: 15}}>

              <View style={styles.compare_title_container}>
                <Text style={styles.compare_title}>Compare</Text>
                <SimpleLineIcons name="plus" style={[styles.add_icon, {paddingRight: 5}]}></SimpleLineIcons>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex:.5}}>
                  <Text>Compare by</Text>
                </View>
                <View style={{flex:.5}}>
                  <Picker
                    mode = "dropdown"
                    selectedValue={this.state.language}
                    // style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({language: itemValue})
                    }>
                    <Picker.Item label="Onset/Duration" value="onset"/>
                    <Picker.Item label="Dose" value="dose"/>
                    <Picker.Item label="Metabolism/Excretion" value="metabolism"/>
                  </Picker>
                </View>
              </View>

            </View>

            <View style={styles.class_list}>
              <FlatList
                // hardcoded example data:
                data={[{name: 'Lorazepam', onset: '15-20 minutes', duration: '8 to 15 hours', metabolism: 'Hepatic'},
                  {name: 'Midazolam', onset: '15 minutes', duration: '<2 hours', metabolism: 'Urine metabolites'}]}
                // tslint:disable-next-line:jsx-no-lambda
                renderItem={({item, index}) => 
                  <View style={{ backgroundColor: colors[index % colors.length] }}>
                    <ListItem noIndent>
                      <View style={styles.container}>

                        <View style={styles.column_header}>
                          <Text style={styles.column_header_text}>{item.name}</Text>
                        </View>
                        
                        <View style={styles.item}>
                          <Text style={{fontWeight:'bold'}}>Onset:</Text>
                        </View>
                        <View style={styles.item}><Text>{item.onset}</Text></View>

                        <View style={styles.item}>
                          <Text style={{fontWeight:'bold'}}>Duration:</Text>
                        </View>
                        <View style={styles.item}><Text>{item.duration}</Text></View>

                        <View style={styles.item}>
                          <Text style={{fontWeight:'bold'}}>Metabolism</Text>
                        </View>
                        <View style={styles.item}><Text>{item.metabolism}</Text></View>

                      </View>

                      <Ionicons name="ios-close" style={[styles.close_icon, {paddingRight: 15}]}></Ionicons>
                    </ListItem>
                  </View>
                }
              />
            </View>

          </Content>
      </Container>
    );
  }
}

// TODO: CONNECT TO ACTUAL BACKEND
// Yujie will fix font styles