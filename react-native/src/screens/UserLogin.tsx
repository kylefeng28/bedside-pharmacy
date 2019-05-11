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


export class Login extends Component {
  state: {
    email: string;
    password: string;
    error: Error | null;
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