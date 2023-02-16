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

const Game = ({navigation}) => {
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
  const [rewardedAd, setRewardedAd] = useState(null);
  const [rewarded, setRewarded] = useState(false)

  useEffect(() => {
    const ad = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });

    const unsubscribeLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log('Rewarded ad loaded');
      setRewarded(true)
    });

    const unsubscribeEarned = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      console.log('User earned reward of ', reward);
      // Cargar un nuevo anuncio recompensado después de que el usuario haya aceptado la recompensa
      ad.load();
    });

    setRewardedAd(ad);

    // Cargar el anuncio recompensado al montar el componente
    ad.load();

    // Limpiar al desmontar el componente
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      
    };
  }, []);

  const handleShowAd = async () => {
    try {
      // Comprobar si el anuncio recompensado está cargado
      if (rewarded) {
        // Mostrar el anuncio recompensado
        await rewardedAd.show();
      } else {
        console.log('Rewarded ad not loaded');
      }
    } catch (error) {
      console.error(error);
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
        dispatch(getQuestion)
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
    }, [ dispatch,timer]);
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
            <Text style={{ color: '#000', margin: 10 }}>correctas: {points}/5</Text>
            <Text style={{ color: '#000', margin: 10 }}>{timer}</Text>
            <Text style={{ color: '#000', margin: 10 }}>{question.question} </Text>

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

    <TouchableOpacity onPress={() => disabled.verdad ? '' : handleVerdad()} >
    <Animatable.View animation={'zoomIn'} style={[styles.btn_verdad]}>
    <Text style={{fontWeight: '700', fontSize: 15}}> Verdad</Text>
    </Animatable.View>
 </TouchableOpacity>
      : null
}

{response === 'Incorrecto!' ? 
  <ShakeButton onPress={handleMito} response={response} />
  : response === 'Correcto!' ? 
  <ShakeButton onPress={handleMito} response={response} />
  :
   response === '' ? 
   <TouchableOpacity onPress={() => disabled.mito ? '' : handleMito()} >
   <Animatable.View animation={'zoomIn'} style={[styles.btn_mito]}>
   <Text style={{fontWeight: '700', fontSize: 15}}> Mito</Text>
   </Animatable.View>
</TouchableOpacity>
    :null
}

{
                response === '' ?
                null
                :
                response === 'Incorrecto!' ?
                <TouchableOpacity onPress={() => [navigation.navigate('Home'), handleShowAd()]} >
                <Animatable.View animation={'zoomIn'} style={[styles.sigiente]}>
                <Text style={{fontWeight: '700', fontSize: 15}}>continuar</Text>
                </Animatable.View>
            </TouchableOpacity>
                
                :
                response === 'Correcto!' ?
                <TouchableOpacity onPress={() => nextQuestions()} >
                <Animatable.View animation={'zoomIn'} style={[styles.sigiente]}>
                <Text style={{fontWeight: '700', fontSize: 15}}> Siguiente pregunta</Text>
                </Animatable.View>
            </TouchableOpacity>
                :
                null
               
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
          <TouchableOpacity style={styles.btn_publi} onPress={() => [handleShowAd(), nextQuestions(), setShowModal(false)]}>
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
      },
      btn_verdad: {
        backgroundColor: '#3cb04f',
      borderRadius: 10,
      padding: 16,
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
      },
      btn_mito: {
        backgroundColor: 'tomato',
      borderRadius: 10,
      padding: 16,
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
      }
  });