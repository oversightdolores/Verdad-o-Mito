import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';
import {useDispatch, useSelector} from 'react-redux';
import {getQuestion} from '../redux/action';



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

        }
    }, [ timerRef]);
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



        }
    };


 

    const nextQuestions = () => {
        dispatch(getQuestion())
            setResponse(''),
            setDisabled({ ...disabled, mito: false, verdad: false }),
            setTimer(20)
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <Text>correctas: {points}/5</Text>
            <Text>{timer}</Text>
            <Text>{question.question} </Text>

            <View style={{ height: 300, width: '90%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', margin: 10, borderColor: response === 'Correcto!' ? '#3cb04f' : response === 'Incorrecto!' ? '#f55' : '#000', borderWidth: 10, borderRadius: 10 }}>{
                response === "Correcto!" ?
                    <>
                        <View >
                            <LottieView style={{ height: 70, width: 70, }} source={require('../animations/success.json')} autoPlay />
                        </View>
                        <Text style={{ color: '#000', margin: 10 }}>{question.description}</Text>
                    </>

                    : response === "Incorrecto!" ?
                        <>
                            <View >
                                <LottieView style={{ height: 70, width: 70, }} source={require('../animations/error.json')} autoPlay loop />

                            </View>
                            <Text style={{ color: '#000', margin: 10 }}>{question.description}</Text>
                        </>
                        : <Text></Text>
            }</View>

            <Button
                title="Verdad"
                onPress={handleVerdad}
                color='#3cb04f'
                disabled={disabled.verdad}


            />

            <Button
                title="Mito"
                onPress={handleMito}
                color='tomato'
                disabled={disabled.mito}

            />

            {
                response === '' ?
                null
                :
                <Button
                title={response === 'Incorrecto!' ? 'continuar': "Siguiente pregunta"}
                onPress={() => nextQuestions()}
            />
            }
        </View>
    );
};

export default Game;
