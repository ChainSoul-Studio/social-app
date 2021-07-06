import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

// Firebase Import
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    }

    this.onSignUp = this.onSignUp.bind(this)
  }

  // Sign Up Function - User Creation -
  onSignUp(){
    const { email, password, name } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email
          })
        // Shows the result of account creation
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
        {/* Input Field for 'name' */}
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />

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
        title='Sign Up'
        />
      </View>
    );
  }
}

export default Register;
