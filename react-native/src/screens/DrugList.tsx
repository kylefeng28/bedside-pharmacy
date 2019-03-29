import {
  Text,
  View,
  Switch,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Card, CardItem, Content, FooterTab, Icon, Footer, List, ListItem } from 'native-base';
import { Ionicons, MaterialCommunityIcons, Entypo, SimpleLineIcons } from '@expo/vector-icons';

import SearchBar from 'react-native-search-bar'
import Search from 'react-native-search-box';

import styles from '../style';

export class DrugList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  // search1: SearchBar

  componentDidMount() {
    this.getDrugList();
    // this.refs.searchBar.focus();
  }

   getDrugList(){
     const content = [{key: 'Alprazolam'}, {key: 'Chlordiazepoxide'}, {key: 'Clonazepam'},{key: 'Diazepam'},{key: 'Lorazepam'},{key: 'Midazolam'}, {key: 'Oxazepam'}, {key: 'Temazepam'}];
     this.setState({
          data: [...this.state.data, ...content]
        });
  }

  _clickDrugList = () => {
    this.props.navigation.navigate('DrugInfoTab');
  };

  

  render() {
    return (
       <Container>
         <Content padder>
           <Text style={styles.title}>Benzodiazepines</Text>
         
            <View style={styles.drug_list}>
              <FlatList
                data={this.state.data}
                //need a data extractor here
                renderItem={({item}) => 
                  <ListItem noIndent style={styles.drug_list_item}
                            onPress={() => this._clickDrugList()}>
                    
                    <SimpleLineIcons name="plus" style={styles.add_icon}></SimpleLineIcons>  
                    <Text style={styles.drug_list_item_text}>{item.key}</Text>  
                 </ListItem>
              }
              />
            </View>
          </Content>
      </Container>
    );
  }
}