import React, { useState } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const Card = () => {
  const [translateX, setTranslateX] = useState(new Animated.Value(0));
  const [gestureState, setGestureState] = useState(State.UNDETERMINED);

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationX } = event.nativeEvent;

      if (translationX > width * 0.5) {
        opened = true;
      }

      Animated.timing(translateX, {
        toValue: opened ? width : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    setGestureState(event.nativeEvent.state);
  };

  const onGestureEvent = event => {
    setTranslateX(event.nativeEvent.translationX);
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
          backgroundColor: 'red',
          width: width,
          height: 200,
        }}
      >
        <Text>Deslice hacia la derecha o izquierda</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Card;
