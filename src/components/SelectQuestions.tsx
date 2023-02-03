import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';

interface Question {
    pregunta: string;
    descripcion: string;
    respuesta: "verdad" | "mito";
}

const questions: Array<Question> = [
    {
        pregunta: "¿El 5G aumenta el riesgo de cáncer?",
        descripcion:
            "Actualmente, no hay evidencia científica que respalde la afirmación de que las ondas electromagnéticas emitidas por la tecnología 5G causan cáncer. Las frecuencias utilizadas por 5G son similares a las de otras tecnologías inalámbricas existentes, como el Wi-Fi y la tecnología 4G, y están dentro de los límites de seguridad establecidos por las agencias reguladoras de salud.",
        respuesta: "mito",
    },
    {
        pregunta: "¿Los smartphones están desplazando a las computadoras?",
        descripcion:
            "Los smartphones se han convertido en un dispositivo cada vez más versátil que puede cumplir muchas de las funciones que antes requerían una computadora. Muchas personas utilizan sus smartphones para navegar por Internet, realizar transacciones en línea, jugar juegos y realizar otras tareas que antes requerían una computadora. Además, la popularidad de las aplicaciones móviles ha aumentado, lo que ha llevado a una mayor dependencia de los smartphones en lugar de las computadoras.",
        respuesta: "verdad",
    },
    {
        pregunta: "¿La inteligencia artificial puede reemplazar completamente a los trabajadores humanos?",
        descripcion:
            "La inteligencia artificial puede automatizar ciertas tareas y mejorar la eficiencia en algunos trabajos, pero es poco probable que la IA reemplace completamente a los trabajadores humanos en un futuro cercano. La IA todavía tiene limitaciones en su capacidad para comprender el contexto y tomar decisiones complejas, y los trabajos que requieren habilidades emocionales y sociales probablemente seguirán siendo desempeñados por humanos.",
        respuesta: "mito",
    },
];


function selectRandomQuestion(questions: Array<Question>): Question {

    return questions[Math.floor(Math.random() * questions.length)];
}

const selectedQuestion = selectRandomQuestion(questions);

console.log("Pregunta seleccionada al azar:");
console.log(selectedQuestion.pregunta);
console.log(selectedQuestion.descripcion);
console.log("Respuesta:", selectedQuestion.respuesta)



const SelectQuestions = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(selectRandomQuestion(questions));
    const [response, setResponse] = useState('')
    const [disabled, setDisabled] = useState({
        verdad: false,
        mito: false
    })


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
    const handleVerdad = () => {
        if (selectedQuestion.respuesta === "verdad") {
            correctSound.setVolume(0.5);
            correctSound.play();
            setDisabled({ ...disabled, mito: true })
            setResponse("Correcto!");

        } else {
            incorrectSound.play();
            setResponse("Incorrecto!");
            setDisabled({ ...disabled, mito: true })


        }
    };


    const handleMito = () => {
        if (selectedQuestion.respuesta === "mito") {
            correctSound.setVolume(0.5);
            correctSound.play();
            setResponse("Correcto!");
            setDisabled({ ...disabled, verdad: true })

        } else {
            incorrectSound.play();
            setResponse("Incorrecto!");
            setDisabled({ ...disabled, verdad: true })


        }
    };


    useEffect(() => { }, [selectedQuestion])
    console.log(response)

    return (
        <View >
            <Text>{selectedQuestion.pregunta} </Text>

            <Text>{response}</Text>

            <View style={{ height: 400, width: 400 }}>{
                response === "Correcto!" ?
                    <>
                        <View style={{ height: 100, width: 100 }}>
                            <LottieView source={require('../animations/success.json')} autoPlay loop />
                        </View>
                        <Text>{selectedQuestion.descripcion}</Text>
                    </>

                    : response === "Incorrecto!" ?
                        <>
                            <View style={{ height: 100, width: 100 }}>
                                <LottieView source={require('../animations/error.json')} autoPlay loop />
                            </View>
                            <Text>{selectedQuestion.descripcion}</Text>
                        </>
                        : <Text></Text>
            }</View>


            <Button
                title="Verdad"
                onPress={handleVerdad}
                color='green'
                disabled={disabled.verdad}
            />

            <Button
                title="Mito"
                onPress={handleMito}
                color='tomato'
                disabled={disabled.mito}

            />

            <Button
                title="Siguiente pregunta"
                onPress={() => [setSelectedQuestion(selectRandomQuestion(questions)), setResponse(''), setDisabled({ ...disabled, mito: false, verdad: false })]}
            />
        </View>
    );
};

export default SelectQuestions;

