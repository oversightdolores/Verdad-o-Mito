
import React,{useEffect,useState} from 'react';
import {


    View
} from 'react-native';
import {
    Banner,
    Interstitial,
    PublisherBanner,
    NativeAdsManager,
  } from 'react-native-ad-manager'

/*         import SelectQuestions from './src/components/SelectQuestions';
        import Rulete from './src/components/Rulete';
        import SlideRight from './src/components/SlideRight'; */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BannerAd,BannerAdSize} from 'react-native-google-mobile-ads';
import FormQuestion from '../pages/FormQuestion';
import Game from '../pages/Game';
import HomeScreen from '../pages/HomeScreen';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import SearchQuestions from '../pages/SearchQuestions';
import SelectGame from '../pages/SelectGame';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers, obtenerPartidas} from '../redux/action';
import {setUser,setUsers,setPartidaSeleccionada} from '../redux/reducer'
import Tienda from '../pages/Tienda';
import HeaderBar from './HeaderBar';

function Navegacion() {
  
  const user = useSelector(state => state.user)
  const state = useSelector(state => state.partidas)
  
    const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
        if (user) {
          const userId = user.uid;
          const usuarioRef = firestore().collection('usuarios').doc(userId);
          usuarioRef.get().then(snapshot => {
            if (snapshot.exists) {
              const userData = snapshot.data();
              
              dispatch(setUser(userData));
            }
          });
        } else {
            dispatch(setUser(null)); // Si el usuario no está autenticado, establece el estado de usuario en nulo
        }
      });
      dispatch(obtenerPartidas())
      dispatch(getUsers())
    
    
 
    // Limpia el escuchador cuando el componente se desmonta
    return () => unsubscribe();
  }, [dispatch]);
  /*   const isDarkMode = useColorScheme() === 'dark';
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }; */
    const adUnitId =  'ca-app-pub-1460570234418559/2902583485';
    const Stack = createNativeStackNavigator();
    
  return (
    <>
        <Stack.Navigator>
      {
        user ?
        <> 
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={Game}  options={{ headerShown: false }}  />
        <Stack.Screen name="Profile" component={Profile}  options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchQuestions}  options={{ headerShown: false }} />
        <Stack.Screen name="Question" component={FormQuestion}  options={{ headerShown: false }} />
        <Stack.Screen name="SelectGame" component={SelectGame}  options={{ headerShown: false }} />
        <Stack.Screen name="Tienda" component={Tienda}  options={{ headerShown: false }} />
        </>
      :
        <>
      <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register}  options={{ headerShown: false }} />
      </>
      }
      </Stack.Navigator>
     
         
      <View style={{alignItems: 'center'}} > 
      <Banner
  adSize={BannerAdSize.SMART_BANNER}
  adUnitID={adUnitId}
  onAppEvent={event => console.log(event.name, event.info)}
/>
     {/*    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    /> */}
    </View>

     </>
  )
}


export default Navegacion;
