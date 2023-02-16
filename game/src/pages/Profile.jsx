import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import {RefreshControl} from 'react-native-gesture-handler'

const Profile = () => {
  return (
    <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Text>Profile</Text>
      <RefreshControl />
    </View>
  )
}

export default Profile