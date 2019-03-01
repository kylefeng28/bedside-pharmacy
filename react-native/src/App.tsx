/*
Framework usage:
 1. NativeBase (https://github.com/GeekyAnts/NativeBase)
 2. @expo/vector-icons (https://docs.expo.io/versions/latest/guides/icons/)
*/

import React, { Component } from 'react';
import styles from './style';
import { StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, Accordion } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Expo from "expo";
import Firebase, {FirebaseContext} from './Firebase';

async function getData(firebase){
  let snapshot = await firebase.drugsDbRef.once('value');
  let data = snapshot.val();
  // console.log(data);
  // data = data['classes'][0]['drugs'];
  return data;
}


export default class HeaderExample extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, data: null };
  }

  // async componentWillMount() {
  //   await Expo.Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  //     Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
  //   });
  //   this.setState({ loading: false });
  // }

  // async componentDidMount() {
  //   let firebase = this.context;
  //   getData(firebase).then((data)=>{
  //                 this.setState({data: data})
  //               });
  // await Expo.Font.loadAsync({
  //   'Roboto': require('native-base/Fonts/Roboto.ttf'),
  //   'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  //   ...Ionicons.font,
  // });
// }

  render() {
    // if (this.state.loading) {
    //   return <Expo.AppLoading />;
    // }
    
    return (

       <Container>
         <FirebaseContext.Consumer>
            {
              (firebase)=>{
                getData(firebase).then((data)=>{
                  this.setState({data: data})
                });
                // let data = await getData(firebase);
                // this.setState({data: data})
                let data = this.state.data ? this.state.data['drugs'][1]['data']['DOSE'] :  'nothing here';

                return (
                  <Container>

                    <Header>
                      <Left>
                        <Button transparent>
                          <Ionicons name="ios-arrow-back" size={32} color="green" />
                        </Button>
                      </Left>

                      <Body>
                        <Title>Durg References</Title>
                      </Body>

                      <Right>
                        <Button transparent>
                          <Ionicons name="ios-search" size={32} color="green" />
                        </Button>
                      </Right>
                    </Header>
                  <Text>{JSON.stringify(data)}</Text>
                </Container>)
              }
            }
            </FirebaseContext.Consumer>
        <Text>Hello

        </Text>
      </Container>
      
    );
  }
}

HeaderExample.contextType = FirebaseContext;