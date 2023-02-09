/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SelectQuestions from './src/components/SelectQuestions';
import Rulete from './src/components/Rulete';
import SlideRight from './src/components/SlideRight';
import FormQuestion from './src/pages/FormQuestion';
import Game from './src/pages/Game';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';



function App() {
  /*   const isDarkMode = useColorScheme() === 'dark';
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }; */

  return (
    
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>

        <Game />



      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
