

import React, {useEffect} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-animatable';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import {useDispatch} from 'react-redux';
import {createUser} from '../redux/action';


const Login = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {authorize, clearSession, user, getCredentials, error} = useAuth0();




 const socket = io('http://192.168.1.16:5174');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// emitir eventos
socket.emit('join', user);

// escuchar eventos
socket.on('new-message', (message) => {
  console.log('Received new message:', message);
});

 

  const loggedIn = user !== undefined && user !== null;
 

  useEffect(() => {
    if (loggedIn) {
    dispatch(createUser(user))
      navigation.navigate('Home');
    }
  }, [loggedIn]);

  const onLogin = async () => {
    await authorize({scope: 'openid profile email'});
    
  };

console.log(user)
  const onLogout = async () => {
    await clearSession(/* {federated: true}, {localStorageOnly: false} */);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Auth0Sample - Login </Text>
      {user && <Text style={styles.header}>You are logged in as {user.name}</Text>}
      {!user && <Text style={styles.header}>You are not logged in</Text>}
      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    margin: 10,
  },
  error: {
    margin: 20,
    textAlign: 'center',
    color: '#D8000C'
  }
});

export default Login