import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useAuth0, } from 'react-native-auth0';
import { useNavigation } from '@react-navigation/native';


const Menu = (props) => {
  
  const {authorize, clearSession, user, getCredentials, error} = useAuth0();
  const navigation = useNavigation()
  const {showMenu, setShowMenu} = props

console.log(showMenu)



  return (
    <View style={{  width:20, alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <TouchableOpacity onPress={() => setShowMenu(showMenu ? false :true)} >
   <Animatable.View animation={'pulse'} >
   
   <Image
            source={{uri: 'https://assets.stickpng.com/thumbs/588a64e7d06f6719692a2d11.png'}}
            style={{height:20, width:20}}
          />
   </Animatable.View>
</TouchableOpacity>


      {showMenu && (
        
        <Animatable.View animation="fadeIn" duration={600} style={{ width:150, position: 'absolute', top: 40, right: 10, zIndex:999, backgroundColor:'rgba(246, 246, 246, 0.80)', borderWidth:1, borderRadius:8}}>
          <Image 
            style={{height:50, width:50, borderRadius: 100, margin:5}}
            source={{uri: user.picture}}
          />
          <Text style={{ color: '#000',padding:5  }}>{user.nickname}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_mito]}>
   
   <Text style={{color: '#000'}}>Perfil</Text>
   </Animatable.View>
</TouchableOpacity>

          <Text style={{ color: '#000', padding: 10 }}>Menu Item 3</Text>
        </Animatable.View>
   
      )}
    </View>
  );
};

export default Menu;



const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cont_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 999
    
  },
  cont_body: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
    
  },
    sigiente: {
      backgroundColor: '#3a86ff',
      width: 200,
      borderRadius: 10,
      padding: 16,
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    correcto: {
      flex:1,
      backgroundColor: 'green',
      borderRadius: 10,
      width:200,
      padding: 16,
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center'
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#0009',
        justifyContent: 'center',
        alignItems: 'center'
      },
      modal_body: {
        padding:10,
        width: 300,
        height:300,
        backgroundColor: '#FFFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
        
      }, 
      cont_button: {
       
        flexDirection: 'row',
        justifyContent: 'center',
        top: 50
      },
      btn_publi : {
        backgroundColor: '#3cb04f', 
        borderRadius: 10,
        width: 60,
        height:40,
      padding: 5,
      margin: 10,    
      alignItems: 'center',
      justifyContent: 'center'
      },
      btn_nopubli : {
        backgroundColor: 'tomato', 
        borderRadius: 10,
        width: 60,
        height:40,
      padding: 5,
      margin: 10, 
      alignItems: 'center',
      justifyContent: 'center'
      },
      btn_verdad: {
        
        backgroundColor: '#3cb04f',
      borderRadius: 10,
      padding: 5,
     
      width: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
      },
      btn_mito: {
       
     
      padding: 5,
      width: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
      },
      btn_option: {
       
       
     
      
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
      }
  });