import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';

const CoinAnimation = () => {
  const [coinCount, setCoinCount] = useState(0);
  const [coinPosition] = useState(new Animated.Value(0));
  const buttonAnim = useRef(null);
  const coinAnim = useRef('');

  const handlePress = () => {
    setCoinCount((prevCount) => prevCount + 1);

    if (buttonAnim.current) {
      buttonAnim.current.animate('pulse');
    }
    coinAnim.current.animate('shake');

 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.coinCount}>{coinCount}</Text>
        <Animatable.View ref={coinAnim} style={styles.coinIconWrapper}>
          <Animated.View style={[styles.coinIcon, ]}>
            <Text style={styles.coinText}>{coinCount}</Text>
          </Animated.View>
        </Animatable.View>
      </View>
      <View style={styles.body}>
        <View style={styles.buttonContainer}>
          <Animatable.View ref={buttonAnim}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Ganar moneda</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  coinCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000',
  },
  coinIconWrapper: {
    position: 'relative',
    width: 30,
    height: 30,
  },
  coinIcon: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
};

export default CoinAnimation;
