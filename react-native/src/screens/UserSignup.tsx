import {
  StyleSheet,
  Text,
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Body, Form, Button, Item, Input, Picker, Title, Card, Content } from 'native-base';
import { firebase } from '../utils/FirebaseWrapper';
import styles from '../style';
import { FirebaseError } from 'firebase';

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
        <Header style={styles.header}>
          <Body style={styles.header_text_box}>
            <Title style={styles.header_text}>Sign up</Title>
          </Body>
        </Header>

        <Content padder style={styles.body}>
          <Text>Please register</Text>

          {/* no onSubmit in native-base */}
          <Form>
            <Item>
              <Input name="email"
                placeholder="Email"
                onChangeText={this.handleChangeGen('email')} />
            </Item>
            <Item>
              <Input name="passwordOne"
                placeholder="Password"
                onChangeText={this.handleChangeGen('passwordOne')} />
            </Item>
            <Item>
              <Input name="passwordTwo"
                placeholder="Confirm password"
                onChangeText={this.handleChangeGen('passwordTwo')} />
            </Item>

            <Item>
              <Picker name="gender"
                mode="dropdown"
                placeholder="I identify as ..."
                selectedValue={this.state.gender}
                onValueChange={this.handleChangeGen('gender')}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </Item>

            <Item>
              <Picker name="profession"
                mode="dropdown"
                placeholder="I am a ..."
                selectedValue={this.state.profession}
                onValueChange={this.handleChangeGen('profession')}>
                <Picker.Item label="Student" value="student" />
                <Picker.Item label="Professional" value="professional" />
              </Picker>
            </Item>

            <Item>
              <Input name="school"
                placeholder="Where do/did you go to school?"
                onChangeText={this.handleChangeGen('school')} />
            </Item>

            <Button block full
              onPress={this.handleSubmit}
              disabled={isInvalid}>
              <Text>Sign up</Text>
            </Button>
          </Form>

        </Content>
      </Container>);
  }
}