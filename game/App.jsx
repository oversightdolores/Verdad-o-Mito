
import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,

  
  View,
} from 'react-native';

import SelectQuestions from './src/components/SelectQuestions';
import Rulete from './src/components/Rulete';
import SlideRight from './src/components/SlideRight';
import FormQuestion from './src/pages/FormQuestion';
import Game from './src/pages/Game';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import Login from './src/pages/Login';
import Register from './src/pages/Register'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/pages/HomeScreen';
import Profile from './src/pages/Profile';
import SearchQuestions from './src/pages/SearchQuestions';
import config from './autho-configuration'
import SelectGame from './src/pages/SelectGame'
import { Dispatch } from 'react';
import auth from '@react-native-firebase/auth';
import Navegacion from './src/components/Navegacion';


function App() {
  const [usr, setUsr] = useState(null);

  useEffect(() => {
    // Escuchador de autenticación de Firebase
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUsr(user);
    
    });

    // Limpia el escuchador cuando el componente se desmonta
    return () => unsubscribe();
  }, []);
  /*   const isDarkMode = useColorScheme() === 'dark';
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }; */
    const adUnitId =  'ca-app-pub-1460570234418559/2902583485';
    const Stack = createNativeStackNavigator();
    
  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <NavigationContainer>
    <Provider store={store}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, }}>
      {/*   <Stack.Navigator>
      {
        usr ?
        <> 
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={Game}  options={{ headerShown: false }}  />
        <Stack.Screen name="Profile" component={Profile}  options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchQuestions}  options={{ headerShown: false }} />
        <Stack.Screen name="Question" component={FormQuestion}  options={{ headerShown: false }} />
        <Stack.Screen name="SelectGame" component={SelectGame}  options={{ headerShown: false }} />
        </>
      :
        <>
      <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register}  options={{ headerShown: false }} />
      </>
      }
      </Stack.Navigator>
     
         
      <View style={{alignItems: 'center'}} > 
        <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
    </View>

 */}     
  <Navegacion/>
  </SafeAreaView>
    </Provider>
    </NavigationContainer>
    </Auth0Provider>
  )
}


export default App;
