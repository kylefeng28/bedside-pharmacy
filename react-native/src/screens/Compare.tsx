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
import RNPickerSelect from 'react-native-picker-select';

// let colors = ['#d9b3ff', '#b3e0ff'];
let colors = ['#ffffff', '#f2f2f2']

export class Compare extends Component {

  constructor(props) {
    super(props);
    this.inputRefs = {
      firstTextInput: null,
      favSport0: null,
      favSport1: null,
      lastTextInput: null,
    };

    this.state = {
      data: [
        {
          label: 'Onset',
          value: 'Onset'
        },
        {
          label: 'Duration',
          value: 'Duration'
        },
        {
          label: 'Metabolism',
          value: 'Metabolism'
        }
      ],
      numbers: [
        {
          name:  'Lorazepam',
          onset: '15-20 minutes',
          duration: '8 to 15 hours',
          metabolism: 'Hepatic'
        },
        {
          name:  'Midazolam',
          onset: '15-20 minutes',
          duration: '8 to 15 hours',
          metabolism: 'Hepatic'
        },
        {
          name:  'Lorazepam',
          onset: '15-20 minutes',
          duration: '8 to 15 hours',
          metabolism: 'Hepatic'
        },
      ],

      favSport0: undefined,
      favSport1: undefined,
      favSport2: undefined,
      favSport3: undefined,
      favSport4: 'baseball',
      favNumber: undefined,
      };
  }

  // search1: SearchBar

  componentDidMount() {
   
  }

 
  

  render() {
    return (
       <Container>
          <Content padder>
            <View>

              <View style={styles.inline}>
               <Text style={[styles.title,styles.main_title]}>Compare</Text>
              <Right>
                <Button transparent>
                <TouchableOpacity>
                   <SimpleLineIcons name="plus" style={styles.add_icon}></SimpleLineIcons> 
                 </TouchableOpacity>
                 </Button>
               </Right>
             </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex:.5}}>
                  <Text style={styles.compared_by}>Compare by</Text>
                </View>
                <View style={{flex:.5}}>
                  <RNPickerSelect
                    // placeholder={{
                    //   label: 'Select a number or add another...',
                    // }}
                    items={this.state.data}
                    onValueChange={value => {
                      this.setState({
                        favNumber: value,
                      });
                    }}
                    value={this.state.favNumber}
                    Icon={() => {
                      return (
                        <View
                          style={{
                            backgroundColor: 'transparent',
                            borderTopWidth: 10,
                            borderTopColor: 'gray',
                            borderRightWidth: 10,
                            borderRightColor: 'transparent',
                            borderLeftWidth: 10,
                            borderLeftColor: 'transparent',
                            width: 0,
                            height: 0,
                          }}
                        />
                      );
                    }}
                  />                 
                </View>
              </View>

            </View>

            <View style={styles.class_list}>
              <FlatList
                // hardcoded example data:
                // data={[{name: 'Lorazepam', onset: '15-20 minutes', duration: '8 to 15 hours', metabolism: 'Hepatic'},
                //   {name: 'Midazolam', onset: '15 minutes', duration: '<2 hours', metabolism: 'Urine metabolites'}]},
                // tslint:disable-next-line:jsx-no-lambda
                data={this.state.numbers}
                renderItem={({item, index}) => 
                  <View style={{ backgroundColor: colors[index % colors.length] }}>
                    <ListItem noIndent>
                      <View style={styles.container}>

                        <View style={styles.compare_drug}>
                          <Text style={styles.column_header_text}>{item.name}</Text>
                        </View>
                        
                        <View style={styles.compare_item}>
                          <Text style={styles.compare_column_name}>{this.state.data[0].label}</Text>
                        </View>
                        <View><Text style={styles.compare_column_value}>{item.onset}</Text></View>

                        <View style={styles.compare_item}>
                          <Text style={styles.compare_column_name}>{this.state.data[1].label}</Text>
                        </View>
                        <View><Text style={styles.compare_column_value}>{item.duration}</Text></View>


                        <View style={styles.compare_item}>
                          <Text style={styles.compare_column_name}>{this.state.data[2].label}</Text>
                        </View>
                        <View><Text style={styles.compare_column_value}>{item.metabolism}</Text></View>

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