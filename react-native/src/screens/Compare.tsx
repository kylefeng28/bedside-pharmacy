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

//Load Firebase
import { firebase } from '../utils/FirebaseWrapper';
let itemsRef = firebase.database.ref('/drugs');

var Cache = require('global-cache');

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
      data: [],
      // labels: [],
      date: new Date()
      };
  }

  componentWillReceiveProps() {
    console.log('rerender here');
    this.getCompareList();
  }

  componentDidMount() {
    this.getCompareList();
  }

  getCompareList() {
    var all_content = [];
    let labels = [];

    itemsRef.on('value', snapshot =>{
      let data = snapshot.val();

      console.log(Cache.get("selected").length);
      if (Cache.get("selected").length > 0) {
        labels = data[Cache.get("selected")[0][0]]['labels'];
      } else {
        labels = [];
      }
        
      var drug_array = [];

      for (var i = 0; i < Cache.get("selected").length; i++) {
        // drug_array.push(Object.keys(data[Cache.get("selected")[i][0]][Cache.get("selected")[i][1]][Cache.get("selected")[i][2]]));
        // console.log(Cache.get("selected")[i][0]);
        // console.log(Cache.get("selected")[i][1]);
        // console.log(Cache.get("selected")[i][2]);
        
        drug_array.push(data[Cache.get("selected")[i][0]][Cache.get("selected")[i][1]][Cache.get("selected")[i][2]]);
      
        var content = [];
        for (var j = 0; j < labels.length; j++) {
          let a = {title:JSON.stringify(labels[j]).replace(/\"/g, ""),content:JSON.stringify((drug_array[i][j]==null) ? "Data not inserted":drug_array[i][j] ).replace(/\"/g, "")};
          content.push(a);
        }
        // content.push({});
        all_content.push({name: Cache.get("selected")[i][2], content: content});
      }

      if (Cache.get("selected").length > 0) {
        drug_array.push(data[Cache.get("selected")[0][0]][Cache.get("selected")[0][1]][Cache.get("selected")[0][2]]);
      } else {
        drug_array = drug_array;
      }
    });

    this.setState({
      // data: [...drug_array],
      data: all_content,
      // labels: labels
    }, function() {console.log(this.state.data);});
  }
  
  _deleteItem(idx) {
    var temp = Cache.get("selected");
    temp.splice(idx, 1);
    Cache.set("selected", temp);
    this.getCompareList();
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
                data={this.state.data}
                renderItem={({item, index}) => 
                  <View style={{ backgroundColor: colors[index % colors.length] }}>
                    <ListItem noIndent>
                      <View style={styles.container}>

                        <View style={styles.compare_drug}>
                          <Text style={styles.column_header_text}>{item["name"]}</Text>
                        </View>
                        
                        {/* <View style={styles.compare_item}>
                          <Text style={styles.compare_column_name}>{item["content"][0]["title"]}</Text>
                        </View>
                        <View><Text style={styles.compare_column_value}>{item["content"][0]["content"]}</Text></View> */}

                        <View style={styles.compare_item}>
                          <Text style={styles.compare_column_name}>{item["content"][1]["title"]}</Text>
                        </View>
                        <View><Text style={styles.compare_column_value}>{item["content"][1]["content"]}</Text></View>

                        <View style={styles.compare_item}>
                          <Text style={styles.compare_column_name}>{item["content"][2]["title"]}</Text>
                        </View>
                        <View><Text style={styles.compare_column_value}>{item["content"][2]["content"]}</Text></View>

                        <View style={styles.compare_item}>
                          <Text style={styles.compare_column_name}>{item["content"][3]["title"]}</Text>
                        </View>
                        <View><Text style={styles.compare_column_value}>{item["content"][3]["content"]}</Text></View>

                        </View>

                      <Ionicons name="ios-close" onPress={() => this._deleteItem(index)} style={[styles.close_icon, {paddingRight: 15}]}></Ionicons>
                    </ListItem>
                  </View>
                }

                keyExtractor={(item, index) => index.toString()}
              />
            </View>

          </Content>
      </Container>
    );
  }
}
