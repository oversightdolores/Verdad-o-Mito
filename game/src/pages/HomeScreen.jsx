
import React,{useEffect,useState} from 'react';
import {Alert,FlatList,Image,StyleSheet,Text,TouchableOpacity,TouchableWithoutFeedback,View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useAuth0} from 'react-native-auth0';
import {useDispatch,useSelector} from 'react-redux';
import {io} from "socket.io-client";
import BtnMenu from '../components/BtnMenu';
import HeaderBar from '../components/HeaderBar';
import PartidasList from '../components/PartidasList';
import {setPartidaSeleccionada} from '../redux/reducer';



export default function HomeScreen({navigation}) {
  const socket = io('http://192.168.1.16:3000/');
 const partidas = useSelector(state => state.partidas)
 const partidasSelec = useSelector(state => state.setPartidaSeleccionada)
 const user = useSelector(state => state.user)
 const usuarios = useSelector(state => state.users)
 const dispatch = useDispatch()
 const {authorize, clearSession, getCredentials, error} = useAuth0();
  const [showMenu, setShowMenu] = useState(false);
  const [coin, setCoin] = useState(500)
  const [life, setLife] = useState(5)
  const [rewaded, setRewaded] = useState(50)
  const[msg, setMsg] = useState('')
  const [usr, setUsr] = useState({})
  const onLogout = async () => {
    await clearSession(/* {federated: true}, {localStorageOnly: false} */);
  };
  

console.log(partidasSelec)   

  const hideMenu =()=> {
    setShowMenu(false)
  }
 
  
  
  return (

    <TouchableWithoutFeedback onPress={() => hideMenu()}>
    <View tyle={styles.container}>
        <HeaderBar style={{zIndex: 999 }}/>
    


<Text style={{color: '#000'}}>
  {msg}
  </Text>
<TouchableOpacity onPress={() => navigation.dispatch(navigation.navigate('Tienda'))} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_tienda]}>
   <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/609/609752.png'}}
            style={{height:30, width:30}}
          />
   
   </Animatable.View>
</TouchableOpacity>
<View style={styles.cont_body}>
      <TouchableOpacity onPress={() => navigation.navigate('SelectGame')} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_init]}>
   <Text style={{fontWeight: '700', fontSize:18 }}> Jugar</Text>
   </Animatable.View>
</TouchableOpacity>
    
<PartidasList />
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
    
    width: '100%',
    height: '100%',
    alignItems: 'center',
    
    
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
      btn_init: {
        backgroundColor: '#8c664f',
      borderRadius: 10,
      padding: 5,
     
      width: 150,
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
      btn_tienda: {
      borderRadius: 10,
      width: 50,
      height: 50,
        borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center'
      },
      btn_option: {
       
       
     
      
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
      }
  });