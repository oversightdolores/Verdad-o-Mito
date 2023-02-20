import { View, Text,Button, Image, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native'
import React, {useEffect, useState} from 'react'
import {useAuth0, } from 'react-native-auth0';
import  * as Animatable from 'react-native-animatable'
import BtnMenu from '../components/BtnMenu';


export default function HomeScreen({navigation}) {
  const {authorize, clearSession, user, getCredentials, error} = useAuth0();
  const [showMenu, setShowMenu] = useState(false);

  const [coin, setCoin] = useState(500)
  const [life, setLife] = useState(5)
  const [rewaded, setRewaded] = useState(50)
  const onLogout = async () => {
    await clearSession(/* {federated: true}, {localStorageOnly: false} */);
  };

  const hideMenu =()=> {
    setShowMenu(false)
  }
  console.log(user)
  useEffect(() => {
    
    !user ? navigation.navigate('Login'): null
  
   
  }, [user])
  
  return (

    <TouchableWithoutFeedback onPress={() => hideMenu()}>
    <View tyle={styles.container}>
      <Text>HomeScreen</Text>
    <View style={styles.cont_header}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_mito]}>
   <Image
    source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png'}}
    style={{height:20, width:20}}
    />
   <Text>{life}</Text>
   </Animatable.View>
</TouchableOpacity>
    
      <TouchableOpacity onPress={() => onLogout} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_mito]}>
    <Image
    source={{uri: 'https://images.emojiterra.com/google/android-10/512px/1f48e.png'}}
    style={{height:20, width:20}}
    />
   <Text>{rewaded}</Text>
   </Animatable.View>
</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.dispatch(navigation.navigate('Profile'))} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_mito]}>
   <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/217/217853.png'}}
            style={{height:20, width:20}}
          />
   <Text>{coin}</Text>
   </Animatable.View>
</TouchableOpacity>

<BtnMenu showMenu={showMenu} setShowMenu={setShowMenu} style={{zIndex: 999 }} />

</View>
<View style={styles.cont_body}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_verdad]}>
   <Text style={{fontWeight: '700', fontSize: 10}}> Nueva Partida</Text>
   </Animatable.View>
</TouchableOpacity>
    
      <TouchableOpacity onPress={() => onLogout()} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_mito]}>
   <Text style={{fontWeight: '700', fontSize: 10}}> Log Out</Text>
   </Animatable.View>
</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.dispatch(navigation.navigate('Profile'))} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_mito]}>
   <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/217/217853.png'}}
            style={{height:20, width:20}}
          />
   <Text>{coin}</Text>
   </Animatable.View>
</TouchableOpacity>
<TouchableOpacity onPress={() => Alert.alert('soy el btn de opciones')} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_option]}>
   <Text style={{fontWeight: '700', fontSize: 18, color:'gray'}}> |||</Text>
   </Animatable.View>
</TouchableOpacity>
</View>
    </View>
    </TouchableWithoutFeedback>
  )
}

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
       
        backgroundColor: 'rgba(74, 74, 74, 0.58)',
      borderRadius: 10,
      padding: 5,
      width: 100,
        borderWidth: 1,
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