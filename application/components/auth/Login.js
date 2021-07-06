import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

// Firebase Import
import firebase from 'firebase'
import 'firebase/auth'

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    }

    this.onSignUp = this.onSignUp.bind(this)
  }

  // Sign Up Function
  onSignUp(){
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        // Create user with result!
        console.log(result)
      })
      .catch((error) => {
        // Catch any errors that are thrown... Might make an error log instead of console.log()?
        console.log(error)
      })
  }

  render() {
    return (
      <View>
        {/* Input Field for 'email' */}
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />

        {/* Input Field for 'password' */}
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Button
        onPress={() => this.onSignUp()}
        title='Sign In'
        />
      </View>
    );
  }
}

export default Login;
