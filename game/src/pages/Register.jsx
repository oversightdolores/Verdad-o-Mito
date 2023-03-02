import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { registro } from '../redux/action';
import {useDispatch} from 'react-redux';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch()

  

  return (
    <View>
      <TextInput
        placeholder="Nombre"
        onChangeText={setNombre}
        value={nombre}
      />
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Contraseña"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={() => dispatch(registro(email, password))} />
      <Button title="Iniciar sesión" onPress={() => navigation.navigate('Login')} />
    </View>
  );
  }
export default Register;
