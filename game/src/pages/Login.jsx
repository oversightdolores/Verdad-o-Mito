/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-animatable';
import {useAuth0, Auth0Provider} from 'react-native-auth0';


const Login = ({navigation}) => {
  const {authorize, clearSession, user, getCredentials, error} = useAuth0();

  const onLogin = async () => {
    await authorize({scope: 'openid profile email'});
    
  };

  const loggedIn = user !== undefined && user !== null;
console.log(user)
  const onLogout = async () => {
    await clearSession(/* {federated: true}, {localStorageOnly: false} */);
  };
  

  return (
    <View style={styles.container}>
      <Image style={{width:100, height: 100, borderRadius: 100}} source={{uri:(user?.picture)}} />
      <Text style={styles.header}> Auth0Sample - Login </Text>
      {user && <Text style={styles.header}>You are logged in as {user.name}</Text>}
      {!user && <Text style={styles.header}>You are not logged in</Text>}
      {user ? navigation.navigate('Home'): null}
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