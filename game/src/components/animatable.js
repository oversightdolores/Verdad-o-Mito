import React from 'react';
import { TouchableOpacity, Text,StyleSheet,View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatedButton = () => {
  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
        <View style={styles.container}>
     <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/217/217853.png'}}
            style={styles.image}
          />
          <Text style={styles.text}>10</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Image
            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png'}}
            style={styles.image}
          />
          <Text style={styles.text}>10</Text>
        </TouchableOpacity>
      </Animatable.View>
      </View>
  );
};

export default AnimatedButton;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      image: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
      },
      text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: 5,
      },
    })
    
   
    