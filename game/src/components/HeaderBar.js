
import React,{useEffect,useState} from 'react';
import {Alert,FlatList,Image,StyleSheet,Text,TouchableOpacity,TouchableWithoutFeedback,View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useAuth0} from 'react-native-auth0';
import {useDispatch,useSelector} from 'react-redux';
import {io} from "socket.io-client";
import BtnMenu from '../components/BtnMenu';
import {setPartidaSeleccionada} from '../redux/reducer';
import CardItems from './CardItems';



export default function HeaderBar ({navigation}) {

 const partidasSelec = useSelector(state => state.setPartidaSeleccionada)
 const user = useSelector(state => state.user)
 const [showMenu, setShowMenu] = useState(false);
  const onLogout = async () => {
    await clearSession(/* {federated: true}, {localStorageOnly: false} */);
  };
  
useEffect(() => {
  
}, [user])

   

  const hideMenu =()=> {
    setShowMenu(false)
  }
 
  
  
  
  return (

    <TouchableWithoutFeedback onPress={() => hideMenu()}>
    <View tyle={styles.container}>
    <View style={styles.cont_header}>
    
    <CardItems image={'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png'} data={user.live}/>
   
<CardItems image={'https://images.emojiterra.com/google/android-10/512px/1f48e.png'} data={user.diamonds}/>

<CardItems image={'https://cdn-icons-png.flaticon.com/512/217/217853.png'} data={user.coins}/>

<BtnMenu showMenu={showMenu} setShowMenu={setShowMenu} style={{zIndex: 999 }} />

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
      borderRadius: 8,
      padding: 2,
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