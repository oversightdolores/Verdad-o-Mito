import { View, Text } from 'react-native'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import {getQuestion} from '../redux/action';
import { useIsFocused } from '@react-navigation/native';


const SearchQuestions = ({navigation}) => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const question = useSelector((state) => state.question);
    const [activo, setActivo] = useState(isFocused)
    console.log(isFocused ? 'Estoy activo' : 'Estoy inactivo')
    console.log(question)
    useEffect(() => {
        
        
        if(isFocused){

            dispatch(getQuestion());
        }
      }, [isFocused]);
    
      useEffect(() => {
        if (question) {
          const timeoutId = setTimeout(() => {
            navigation.navigate('Game');
          }, 2000);
          return () => clearTimeout(timeoutId);
        }
        
    
      }, [question, navigation]);


  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <LottieView style={{ height: 200, width: 200, }} source={require('../animations/search.json')} autoPlay loop />
    </View>
  )
}

export default SearchQuestions