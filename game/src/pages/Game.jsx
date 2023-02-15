import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';
import {useDispatch, useSelector} from 'react-redux';
import {getQuestion} from '../redux/action';
import ShakeButton from '../components/ShakeButton';
import * as Animatable from 'react-native-animatable';
import { RewardedAd, RewardedAdEventType, TestIds  } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-1460570234418559/4817466382';


const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });


//ca-app-pub-1460570234418559/4817466382

const Game = () => {
    const dispatch = useDispatch()
    const question = useSelector(state => state.question)
    const [selectedQuestion, setSelectedQuestion] = useState();
    const [response, setResponse] = useState('')
    const [timer, setTimer] = useState(20)
    const [points, setPoints] = useState(0)
    const timerRef = useRef(timer)
    const [disabled, setDisabled] = useState({
        verdad: false,
        mito: false
    })
  const [showModal, setShowModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [rewarded]);

  const handleResponse = (response) => {
   
        if (loaded) {
          if (response === "Incorrecto!" ) {
              console.log(response)
            rewarded.show();
          }
        } else {
          console.log('The RewardedAd has not loaded yet.');
        }
      
  };

  
    console.log(question)
    const correctSound = new Sound(require('../sounds/success.mp3'), Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('Failed to load the sound', error);
        }
    });
    const incorrectSound = new Sound(require('../sounds/error.mp3'), Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('Failed to load the sound', error);
        }
    });


    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);

        return () => {
            clearInterval(timerRef.current);
        };
    }, [timer, timerRef]);

    useEffect(() => {
        if (timer === 0) {
            incorrectSound.setVolume(0.5)
            incorrectSound.play();
            setDisabled({ ...disabled, mito: true, verdad: true })
            clearInterval(timerRef.current)
            setResponse('Incorrecto!')

        }
    }, [ timerRef,timer]);
    //generame una funcion de carga

    const handleVerdad = () => {
        if (question.response === "verdad") {
            correctSound.setVolume(0.5);
            correctSound.play();
            setDisabled({ ...disabled, mito: true,verdad: true })
            setResponse("Correcto!");
            clearInterval(timerRef.current);
            setPoints(points + 1)


        } else {
            incorrectSound.play();
            setResponse("Incorrecto!");
            setDisabled({ ...disabled, mito: true, verdad: true })
            clearInterval(timerRef.current);
            setShowModal(true)
           



        }
    };


    const handleMito = () => {
        if (question.response === "mito") {
            correctSound.setVolume(0.5);
            correctSound.play();
            setResponse("Correcto!");
            setDisabled({ ...disabled, verdad: true, mito: true })
            clearInterval(timerRef.current);
            setPoints(points +1 )

        } else {
            incorrectSound.play();
            setResponse("Incorrecto!");
            setDisabled({ ...disabled, verdad: true, mito: true })
            clearInterval(timerRef.current);
            setShowModal(true)


        }
    };


 

    const nextQuestions = () => {
        dispatch(getQuestion())
            setResponse(''),
            setDisabled({ ...disabled, mito: false, verdad: false }),
            setTimer(20)
    }

    return (
        <View style={{flex: 1}}>
            <Text>correctas: {points}/5</Text>
            <Text>{timer}</Text>
            <Text>{question.question} </Text>

            <View style={{ height: 300, width: '90%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', margin: 10, borderColor: response === 'Correcto!' ? '#3cb04f' : response === 'Incorrecto!' ? '#f55' : '#FFF', borderWidth: 10, borderRadius: 10 }}>{
                response === "Correcto!" ?
                    <>
                            <LottieView style={{ height: 50, width: 50, top: -40 }} source={require('../animations/success.json')} autoPlay />
                        <View >
                        <Text style={{ color: '#000', margin: 10 }}>{question.description}</Text>
                        </View>
                    </>

                    : response === "Incorrecto!" ?
                        <>
                                <LottieView style={{ height: 50, width: 50, top: -40 }} source={require('../animations/error.json')} autoPlay loop />
                            <View >

                            <Text style={{ color: '#000', margin: 10 }}>{question.description}</Text>
                            </View>
                        </>
                        : <Text></Text>
            }</View>

{response === 'Incorrecto!' ? 
  <ShakeButton onPress={handleVerdad} />
  : response === 'Correcto!' ? 
  <ShakeButton onPress={handleVerdad} />
  : 
    response === '' ? 

    <Button
        title="Verdad"
        onPress={handleVerdad}
        color='#3cb04f'
        disabled={disabled.verdad}
      />
      : null
}

{response === 'Incorrecto!' ? 
  <ShakeButton onPress={handleMito} response={response} />
  : response === 'Correcto!' ? 
  <ShakeButton onPress={handleMito} response={response} />
  :
   response === '' ? 
  <Button
      title="Mito"
      onPress={handleMito}
      color='tomato'
      disabled={disabled.mito}
    />
    :null
}

            {
                response === '' ?
                null
                :
                <TouchableOpacity onPress={() => nextQuestions()} >
                <Animatable.View animation={'zoomIn'} style={[styles.sigiente]}>
                <Text style={{fontWeight: '700', fontSize: 15}}>{response === 'Incorrecto!' ? 'continuar': "Siguiente pregunta"}</Text>
                </Animatable.View>
            </TouchableOpacity>
               
            }

<View>
     

      <Modal  
        transparent={true}
        animationType='fade'
       
        visible={showModal} >
        <View style={styles.modalContent}>
            <View style={styles.modal_body}>
          <Text style={{color: '#000',}}>Incorrect answer. Try again?</Text>
          <TouchableOpacity style={styles.btn_publi} onPress={() => [setResponse('Incorrecto!'), setShowModal(false)]}>
            <Text style={{color: '#000',}} >No</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_publi} onPress={() => [handleResponse(response), nextQuestions(), setShowModal(false)]}>
            <Text style={{color: '#000',}} >Yes</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  




        </View>
    );
};

export default Game;


const styles = StyleSheet.create({
    sigiente: {
      backgroundColor: '#3a86ff',
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
        width: 200,
        height:200,
        backgroundColor: '#FFFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
      }, 
      btn_publi : {
        backgroundColor: '#3a86ff', 
        borderRadius: 10,
      padding: 16,
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
      }
  });