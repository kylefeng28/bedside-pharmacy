import React, { Component } from 'react';
import { TouchableHighlight, Text, View,FlatList} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Card, CardItem, Content, FooterTab, Icon, Footer, List, ListItem } from 'native-base';
// import AtoZListView from 'react-native-atoz-listview';
 
const rowHeight = 40;

// class Component extends React.Component {
// render() {
// 	return 
// 	{this.props.text}
// ;
// }
// }
// Component.propTypes = {
// text: PropTypes.string.isRequired,
// };

// Component.propTypes = {
// text: PropTypes.string.isRequired,
// };
 
export class Test extends Component {
 
  state = {
    data: [{key:'1', name: 'Anticid',type: 'drug', path:['hello','hello']}, 
    		{key:'2', name: 'Anticid',type: 'drug', path:['hello','hello']}, 
    		{key:'3', name: 'Anticid',type: 'drug', path:['hello','hello']}]
  }
 
  // Define your own renderRow
  // renderRow = (item, sectionId, index) => {
  //   return (
  //     <TouchableHighlight 
  //       style={{ 
  //         height: rowHeight, 
  //         justifyContent: 'center', 
  //         alignItems: 'center'}}
  //     >
  //       <Text>{item.name}</Text>
  //     </TouchableHighlight>
  //   );
  // }
 
  render() {
    // inside your render function
    return (
      <View style={{ flex: 1}}>
	      <FlatList
            data={this.state.data}
            //need a data extractor here
            renderItem={({item}) => 
              <ListItem noIndent>
                <Left>
                  <Text>{item.name}</Text>
                  <Text>{item.key}</Text>
                </Left>
             </ListItem>
          }
          />

      </View>
    );
  }
}