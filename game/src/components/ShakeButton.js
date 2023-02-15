import React from 'react';
import { TouchableOpacity, StyleSheet,Text } from 'react-native';
import * as Animatable from 'react-native-animatable';


const ShakeButton = ({ response }) => {
  

  return (
    <>
    {
      response === 'Incorrecto!' ?

    <TouchableOpacity >
    <Animatable.View animation={'shake'} style={[styles.incorrecto]}>
     <Text style={{fontWeight: '700', fontSize: 15}}>{response}</Text>
    </Animatable.View>
  </TouchableOpacity>
:
response === 'Correcto!' ?
<TouchableOpacity >
    <Animatable.View animation={'shake'} style={[styles.correcto]}>
     <Text style={{fontWeight: '700', fontSize: 15}}>{response}</Text>
    </Animatable.View>
  </TouchableOpacity>
  :
null
    }
    </>
  )
}

const styles = StyleSheet.create({
  incorrecto: {
    backgroundColor: 'tomato',
    borderRadius: 10,
    padding: 16,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  correcto: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 16,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    

  },
});
export default ShakeButton;
