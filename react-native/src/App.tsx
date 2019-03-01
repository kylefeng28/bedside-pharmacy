/*
Framework usage:
 1. NativeBase (https://github.com/GeekyAnts/NativeBase)
 2. @expo/vector-icons (https://docs.expo.io/versions/latest/guides/icons/)
*/

import React, { Component } from 'react';
import styles from './style';
import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Text, Accordion, Card, CardItem } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
// import Expo from "expo";
import Firebase, {FirebaseContext} from './Firebase';

async function getData(firebase){
  let snapshot = await firebase.drugsDbRef.once('value');
  let data = snapshot.val();
  return data;
}


export default class HeaderExample extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, data: null };
  }


  render() {
    return (

       <Container>
         <FirebaseContext.Consumer>
            {
              (firebase)=>{
                getData(firebase).then((data)=>{
                  this.setState({data: data})
                });

                let d_name = (JSON.stringify(this.state.data ? this.state.data['drugs'][6]['name'] :  '')).slice(1,-1);

                let d_alcohol_withdraw = (JSON.stringify(this.state.data ? this.state.data['drugs'][6]['data']['DOSE']['Alcohol withdrawal'] :  '')).slice(1,-3);

                let d_agitation = (JSON.stringify(this.state.data ? this.state.data['drugs'][6]['data']['DOSE']['Anxiety, agitation'] :  '')).slice(1,-3);


                let d_excretion = (JSON.stringify(this.state.data ? this.state.data['drugs'][6]['data']['METABOLISM_EXCRETION']['Excretion'] :  '')).slice(1,-3);


                let d_metabolism = ((JSON.stringify(this.state.data ? this.state.data['drugs'][6]['data']['METABOLISM_EXCRETION']['Metabolism'] :  '')).slice(1,-3).replace("\\n", " ")).replace("\\n", " ");


                let d_half_life = JSON.stringify(this.state.data ? this.state.data['drugs'][6]['data']['ONSET_DURATION']['Half-life'] :  '').slice(1,-3);


                 let d_onset = (JSON.stringify(this.state.data ? this.state.data['drugs'][6]['data']['ONSET_DURATION']['Onset'] :  '')).slice(1,-3);


                let d_contrainidications = (JSON.stringify(this.state.data ? this.state.data['drugs'][6]['data']['WARNINGS']['Contrainidications'] :  '')).slice(1,-3);

                let d_warnings = ((JSON.stringify(this.state.data ? this.state.data['drugs'][6]['data']['WARNINGS']['Warnings'] :  '')).slice(1,-3)).replace("\\n", " ");

                return (
                  <Container>

                    <Header>
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

                    <ScrollView style={styles.box}>
                      <H1 style={styles.title}>{d_name}</H1>
                      <Card>
                        <CardItem header bordered style={styles.column}>
                          <Text style={styles.column_head}>Dose</Text>
                        </CardItem>
                        <CardItem bordered>
                          <Body>
                            <Text>
                              Alcohol withdraw: {d_alcohol_withdraw}
                            </Text>
                          </Body>
                        </CardItem>

                        <CardItem bordered>
                          <Body>
                            <Text>
                              Anxiety, agitation: {d_agitation}      
                            </Text>
                          </Body>
                        </CardItem>

                        <CardItem header bordered style={styles.column}>
                          <Text style={styles.column_head}>Metabolism Excretion</Text>
                        </CardItem>
                        <CardItem bordered>
                          <Body>
                            <Text>
                              Excretion: {d_excretion}
                            </Text>
                          </Body>
                        </CardItem>

                        <CardItem bordered >
                          <Body>
                            <Text>
                              Metabolism: {d_metabolism}      
                            </Text>
                          </Body>
                        </CardItem>

                         <CardItem header bordered style={styles.column}>
                          <Text style={styles.column_head}>Onset Duration</Text>
                        </CardItem>
                        <CardItem bordered>
                          <Body>
                            <Text>
                              Half-life: {d_half_life}
                            </Text>
                          </Body>
                        </CardItem>

                        <CardItem bordered>
                          <Body>
                            <Text>
                              Onset: {d_onset}      
                            </Text>
                          </Body>
                        </CardItem>
                  

                         <CardItem header bordered style={styles.column}>
                          <Text style={styles.column_head}>Warnings</Text>
                        </CardItem>
                        <CardItem bordered>
                          <Body>
                            <Text>
                            Contrainidications:{d_contrainidications}
                            </Text>
                          </Body>
                        </CardItem>

                        <CardItem bordered>
                          <Body>
                            <Text>
                              Onset: {d_warnings}      
                            </Text>
                          </Body>
                        </CardItem>

                    </Card>
                  </ScrollView>

                </Container>)
              }
            }
            </FirebaseContext.Consumer>
      </Container>
      
    );
  }
}

HeaderExample.contextType = FirebaseContext;