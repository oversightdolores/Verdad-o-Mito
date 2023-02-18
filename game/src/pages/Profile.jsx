import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {RefreshControl} from 'react-native-gesture-handler'
import {useAuth0, } from 'react-native-auth0';
import { useNavigation } from '@react-navigation/native';




const Profile = ({navigation}) => {
  const {authorize, clearSession, user, getCredentials, error} = useAuth0();
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />


    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text style={{color: '#000', margin:20}}> Go Back  </Text>
      </TouchableOpacity>
      <Image
      style={{width:200, height:200, borderRadius: 100}}
      source={{uri: user.picture}}
      />
      <Text style={{color: '#000'}}>{user.name}</Text>
      <Text style={{color: '#000'}}>{user.nickname}</Text>
      <RefreshControl />
    </View>
    </>
  )
}

export default Profile