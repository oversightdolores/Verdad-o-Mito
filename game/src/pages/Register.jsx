import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Auth0 from 'react-native-auth0';

const apiUrl = 'http://192.168.1.16:5173/register';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const auth0 = new Auth0({
        domain: 'verdadomito.us.auth0.com',
        clientId: 'ugf7ZQ64ZPWRDlZl1U7L2zdXlb36Jb1i'
      });
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      const { userId } = data;
      const tokens = await auth0.auth.createUser({
        email,
        password,
        username,
        connection: 'Username-Password-Authentication',
       
      });
      console.log(tokens);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 10
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default Register;
