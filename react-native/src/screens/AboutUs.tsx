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
import { Container, Header, Left, Body, Right, Button, H1, H2, H3, Title, Card, CardItem, Content, FooterTab, Icon, Footer, List, ListItem, Item, Input} from 'native-base';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Search from 'react-native-search-box';
import * as SearchUtil from '../utils/SearchUtil';
import AtoZListView from 'react-native-atoz-listview';

import styles from '../style';

export class About extends Component {

  render() {

    return (
      <Container>
      	<Content padder>
	      	<Text style={[styles.title,styles.main_title]}>About Us</Text>
	      	<Text style={styles.about_text}>Bedside SICU Pharmacy App was designed to aid clinicians by simplifying the medication research process.  We hope that this application can be useful when making important decisions in critical times.</Text>
	      	<Text style={styles.about_header}>Initialized by</Text>
	      	<Text style={[styles.about_text, styles.about_text_sp]}>
	      		  John Yoon, DO
				  Trauma and Surgical Critical Care
				  University of North Carolina</Text>
			<Text style={styles.about_text}>
				Oysheek Banerjee, PharmD
				Crtical Care Pharmacy
				University of North Carolina</Text>
			
			<Text style={styles.about_header}>Medical Student Contributors</Text>
			<Text style={styles.about_text}>Ale Tomasi, MD</Text>
			<Text style={styles.about_text}>Christian Kotanen, MD</Text>
			<Text style={styles.about_text}>Sammy Pistolis, MD</Text>

			<Text style={styles.about_header}>Mobile App Development Team</Text>
			<Text style={styles.about_text}>Kyle Feng</Text>
			<Text style={styles.about_text}>Theresa Medonza</Text>
			<Text style={styles.about_text}>Yujie Tao</Text>
			<Text style={styles.about_text}>Yuxuan Liu</Text>


      	</Content>

      </Container>);
  }
}