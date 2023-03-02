import {Alert,FlatList,Image,StyleSheet,Text,TouchableOpacity,TouchableWithoutFeedback,View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import React from 'react'

const CardItems = (props) => {
    const {image, data} = props
  return (
    <View>
<TouchableOpacity onPress={() => navigation.dispatch(navigation.navigate('Profile'))} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_mito]}>
    <View style={{ position: 'absolute',right: -5, top:-5, zIndex: 999 }} >
    <Image style={{height: 12, width: 12}} source={{uri: 'https://cdn-icons-png.flaticon.com/512/4315/4315609.png'}} />
    </View>
    <View style={{ left: -9, alignItems: 'center', position: 'absolute'}}>
   <Image
            source={{uri: image}}
            style={{height:18, width:18}}
          />
    </View>
   <Text style={{fontWeight: 'bold', fontSize: 15}}>{data}</Text>
   </Animatable.View>
</TouchableOpacity>
    </View>
  )
}

export default CardItems

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    cont_header: {
      flexDirection: 'row',
      margin: 10,
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
        borderRadius: 8,
        padding: 5,
       
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
        },
        btn_mito: {
          backgroundColor: 'rgba(74, 74, 74, 0.58)',
        borderRadius: 5,
        
        width: 80,
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