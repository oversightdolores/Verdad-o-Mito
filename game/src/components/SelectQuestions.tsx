import React, { useEffect, useState, useRef } from 'react';
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
        pregunta: "¿Es cierto que los atletas deben comer carne roja para tener más proteína en su dieta? ",
        descripcion:
            "La verdad es que los atletas pueden obtener proteína de diferentes fuentes, incluyendo carnes rojas, aves, pescados, productos lácteos y vegetarianos. No es necesario consumir carne roja para tener una dieta equilibrada y adecuada para el deporte.",
        respuesta: "mito",
    },
    {
        pregunta: "¿Es verdad que hacer ejercicio en la mañana antes de desayunar es más efectivo para perder peso? ",
        descripcion:
            "No hay una hora específica del día que sea más efectiva para hacer ejercicio o perder peso. Lo más importante es hacer ejercicio regularmente y mantener una dieta equilibrada.",
        respuesta: "mito",
    },
    {
        pregunta: "¿Es cierto que beber agua fría ayuda a quemar más calorías durante el ejercicio? ",
        descripcion:
            "El cuerpo no quema calorías adicionales al beber agua fría o caliente. Lo más importante es mantenerse hidratado durante el ejercicio.",
        respuesta: "mito",
    },
    {
        pregunta: "¿Es cierto que todas las estrellas de Hollywood tienen un entrenador personal? ",
        descripcion:
            "No todas las estrellas de Hollywood tienen un entrenador personal, aunque es común que algunas personas famosas contraten a un entrenador para ayudarles a mantenerse en forma.",
        respuesta: "mito",
    },
    {
        pregunta: "¿Es cierto que los dinosaurios están extintos desde hace 65 millones de años?",
        descripcion:
            " Los dinosaurios están extintos desde hace 65 millones de años, debido a un impacto de un asteroide en la Tierra.",
        respuesta: "verdad",
    },
    {
        pregunta: "¿Es un mito que los dioses griegos eran inmortales?",
        descripcion:
            "Los dioses griegos eran considerados inmortales, pero no eran inmunes a sufrir daños o ser heridos.",
        respuesta: "verdad",
    },
    {
        pregunta: "¿Es un mito que Cleopatra era egipcia?",
        descripcion:
            "Cleopatra era de origen griego, pero nació en Egipto y se convirtió en la última reina de Egipto.",
        respuesta: "verdad",
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
    const [timer, setTimer] = useState(30)
    const timerRef = useRef(timer)
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
    }, [timer, timerRef]);


    const handleVerdad = () => {
        if (selectedQuestion.respuesta === "verdad") {
            correctSound.setVolume(0.5);
            correctSound.play();
            setDisabled({ ...disabled, mito: true })
            setResponse("Correcto!");
            clearInterval(timerRef.current);


        } else {
            incorrectSound.play();
            setResponse("Incorrecto!");
            setDisabled({ ...disabled, mito: true })
            clearInterval(timerRef.current);



        }
    };


    const handleMito = () => {
        if (selectedQuestion.respuesta === "mito") {
            correctSound.setVolume(0.5);
            correctSound.play();
            setResponse("Correcto!");
            setDisabled({ ...disabled, verdad: true })
            clearInterval(timerRef.current);

        } else {
            incorrectSound.play();
            setResponse("Incorrecto!");
            setDisabled({ ...disabled, verdad: true })
            clearInterval(timerRef.current);



        }
    };


    useEffect(() => { }, [selectedQuestion])
    console.log(response)

    const nextQuestions = () => {
        setSelectedQuestion(selectRandomQuestion(questions)),
            setResponse(''),
            setDisabled({ ...disabled, mito: false, verdad: false }),
            setTimer(30)
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <Text>{timer}</Text>
            <Text>{selectedQuestion.pregunta} </Text>

            <View style={{ height: 300, width: '90%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', margin: 10, borderColor: response === 'Correcto!' ? '#3cb04f' : response === 'Incorrecto!' ? '#f55' : '#000', borderWidth: 10, borderRadius: 10 }}>{
                response === "Correcto!" ?
                    <>
                        <View >
                            <LottieView style={{ height: 70, width: 70, }} source={require('../animations/success.json')} autoPlay />
                        </View>
                        <Text style={{ color: '#000', margin: 10 }}>{selectedQuestion.descripcion}</Text>
                    </>

                    : response === "Incorrecto!" ?
                        <>
                            <View >
                                <LottieView style={{ height: 70, width: 70, }} source={require('../animations/error.json')} autoPlay loop />

                            </View>
                            <Text style={{ color: '#000', margin: 10 }}>{selectedQuestion.descripcion}</Text>
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

            <Button
                title="Siguiente pregunta"
                onPress={() => nextQuestions()}
            />
        </View>
    );
};

export default SelectQuestions;

