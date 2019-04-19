import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Body, Form, Button, Item, Input, Picker, Title, Label, Card, Content } from 'native-base';
import { firebase } from '../utils/FirebaseWrapper';
import styles from '../style';
import { FirebaseError } from 'firebase';
import RNPickerSelect from 'react-native-picker-select';

const SIGNUP_INITIAL_STATE = {
  error: null,
  email: '',
  passwordOne: '',
  passwordTwo: '',
  gender: undefined,
  profession: undefined,
  school: undefined
};


export class UserSignup extends Component {
  state: {
    error: Error | null;
    email: string;
    passwordOne: string;
    passwordTwo: string;
    profession: string | undefined;
    // TODO
  }

  constructor(props) {
    super(props);

    this.state = { ...SIGNUP_INITIAL_STATE };
  }

  handleChangeGen = (name) => (value) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { email, passwordOne, passwordTwo, gender, profession, school} = this.state;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((credential: firebase.auth.UserCredential) => {
        // TODO refactor into separate function
        const uid = credential.user.uid;
        firebase.database.ref('/users/' + uid).set({
          gender: gender,
          profession: profession,
          school: school
        })

        alert('Successful registration!');
      })
      .catch(error => {
        alert('Failed to register!')
        this.setState({ error });
      });
  };

  render() {
    const { email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <Container>

        <Content padder>
          <Text style={[styles.title,styles.main_title,styles.register_title]}>Create your account</Text>
          <Text style={styles.register_subtitle}>Already has an account? <Text style={styles.switch_login}>Log in here</Text></Text>

          <View style={styles.register_conainer}>
            <Item stackedLabel>
              <Label style={styles.label}>Email</Label>
                <Input name="email"
                  onChangeText={this.handleChangeGen('email')} />
            </Item>

            <Item stackedLabel>
              <Label style={styles.label}>Password</Label>
              <Input name="passwordOne"
                onChangeText={this.handleChangeGen('passwordOne')} />
            </Item>

            <Item stackedLabel>
              <Label style={styles.label}>Confirm Password</Label>
              <Input name="passwordTwo"
                onChangeText={this.handleChangeGen('passwordTwo')} />
            </Item>

            <Item stackedLabel>
              <Label style={styles.label}>School</Label>
              <Input name="school"
                onChangeText={this.handleChangeGen('school')} />
            </Item>

            <View style={styles.inline}>
              <Item stackedLabel style={styles.half}>
                <Label style={styles.label}>Gender</Label>
                <Picker name="gender"
                  mode="dropdown"
                  selectedValue={this.state.gender}
                  onValueChange={this.handleChangeGen('gender')}>
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </Item>

              {/* TODO add name */}
              {/* TODO add 
              Attending Physician
              Fellow
              Resident Physician
              Medical Student
              Nurse
              Pharmacist
              Pharmacy Student
              Other

              */}
              {/* TODO add password strength meter */}
              <Item stackedLabel style={styles.half}>
              <Label style={styles.label}>Profession</Label>
                <Picker name="profession"
                  mode="dropdown"
                  selectedValue={this.state.profession}
                  onValueChange={this.handleChangeGen('profession')}>
                  <Picker.Item label="Student" value="student" />
                  <Picker.Item label="Professional" value="professional" />
                </Picker>
              </Item>
            </View>

  
            <Button block full
              onPress={this.handleSubmit}
              disabled={isInvalid}
              style={styles.login_button}>
              <Text style={styles.login_text}>Sign up</Text>
            </Button>
          </View>

        </Content>
      </Container>);
  }
}
