import {
  StyleSheet,
  Text,
} from 'react-native';

import React, { Component } from 'react';
import { Container, Header, Body, Form, Button, Item, Input, Title, Card, Content } from 'native-base';
import { firebase } from '../utils/FirebaseWrapper';
import styles from '../style';

const LOGIN_INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};


export class UserLogin extends Component {
  state: {
    email: string;
    password: string;
    error?: Error;
  }

  constructor(props) {
    super(props);

    this.state = { ...LOGIN_INITIAL_STATE };
  }

  handleChangeGen = (name) => (value) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        alert('Successful login!')
      })
      .catch(error => {
        alert('Failed to login')
        this.setState({ error });
      });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <Container>

        <Content padder style={styles.body}>
          <Text>Please log in</Text>

          {/* no onSubmit in native-base */}
          <Form>
            <Item>
              <Input name="email"
                placeholder="Email"
                onChangeText={this.handleChangeGen('email')} />
            </Item>
            <Item>
              <Input name="password"
                placeholder="Password"
                onChangeText={this.handleChangeGen('password')} />
            </Item>

            <Button block full
              onPress={this.handleSubmit}
              disabled={isInvalid}>
              <Text>Login</Text>
            </Button>
          </Form>

        </Content>
      </Container>);
  }
}

const SIGNUP_INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};


export class UserSignup extends Component {
  state: {
    email: string;
    passwordOne: string;
    passwordTwo: string;
    error?: Error;
  }

  constructor(props) {
    super(props);

    this.state = { ...SIGNUP_INITIAL_STATE };
  }

  handleChangeGen = (name) => (value) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { email, passwordOne, passwordTwo, error } = this.state;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        alert('Successful registration!')
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