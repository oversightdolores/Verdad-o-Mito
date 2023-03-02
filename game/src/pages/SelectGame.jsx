import React, { useEffect, useState } from 'react';
import { View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { crearPartida } from '../redux/action';

const SelectGame = () => {
 const user = useSelector((state) => state.user)
 const usuarios = useSelector((state) => state.users)
 const turnoActual = useSelector((state) => state.turnoActual)
 const partidaSeleccionada = useSelector((state) => state.partidaSeleccionada)
 const dispatch = useDispatch()
  const [partidas, setPartidas] = useState([]);
  const navigation = useNavigation();
  const [nombres, setNombres] = useState([])

  useEffect(() => {

    if(partidaSeleccionada){
      
      
      irAPantallaDeJuego(partidaSeleccionada)
    }

    // Limpia el escuchador cuando el componente se desmonta
  
}, [partidaSeleccionada]); 

  /* const seleccionarPartida = (partida) => {
    console.log(partida?.jugadores)
    if (partida.jugadores.length === 2) {
      irAPantallaDeJuego(partida);
    } else {
      // Aquí puedes mostrar una alerta o un mensaje indicando que la partida no es válida.
      console.log('le estamos errando')
    }
  }; */
  // Variable de estado para llevar registro del turno actual

// Función para manejar la navegación a la pantalla de juego
const irAPantallaDeJuego = (partidaSeleccionada) => {
  const uidJugadorActual = user.uid; // Obtener el UID del jugador actual
  if (turnoActual === 0 || turnoActual === uidJugadorActual) {
    // Permitir la navegación si no hay nadie con el turno actual o si el turno actual coincide con el UID del jugador actual
    navigation.navigate('Game', { partida: partidaSeleccionada });
  } else {
    // Mostrar un mensaje de error si el jugador intenta acceder a la partida antes de que sea su turno
    alert('No es tu turno');
  }
};

// Función para manejar el fin del turno del jugador 1
const terminarTurnoJugador1 = () => {
  setTurnoActual(2); // Actualizar el turno actual a 2 para indicar que es el turno del jugador 2
};

// Función para manejar el fin del turno del jugador 2
const terminarTurnoJugador2 = () => {
  setTurnoActual(0); // Actualizar el turno actual a 0 para indicar que no hay nadie con el turno actual
};

  

 /*  useEffect(() => {
    const usuarioActual = auth().currentUser;
    if (usuarioActual) {
      firestore().collection('partidas')
        .where('jugadores', 'array-contains', usuarioActual.uid)
        .onSnapshot((snapshot) => {
          const partidasData = [];
          snapshot.forEach((doc) => {
            partidasData.push({ id: doc.id, ...doc.data() });
          });
         
          setPartidas(partidasData);
        });
    }handleShowAd
  }, []); */
  useEffect(() => {
    const partidasRef = firestore().collection('partidas');
    
    
    
  /*   
    const obtenerPartidas = () => {
      partidasRef.onSnapshot((snapshot) => {
        const partidas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPartidas(partidas);
      });
    }; */
    
   
    
  //  obtenerPartidas();
}, []);

 

  /* const crearPartida = async (partidaNombre,jugadores) => {
    const userId = user.uid;

    try {
      const partidaRef = await firestore()
        .collection('partidas')
        .add({
          nombre: partidaNombre,
           jugadores,
        });

      const usuarioRef = await firestore()
        .collection('usuarios')
        .doc(userId)
        .set({
          nombre: user,
          partida: partidaRef.id,
        });
       
      setPartidaSeleccionada({ id: partidaRef.id, nombre: partidaNombre });
      
    } catch (error) {
      console.error(error);
    }
  }; */

  const unirsePartida = async () => {
    if (!partidaSeleccionada) {
      console.log('Por favor seleccione una partida');
      return;
    }

    const userId = user.uid;
    const partidaId = partidaSeleccionada.id;

    try {
      const partidaRef = await firestore()
        .collection('partidas')
        .doc(partidaId)
        .get();

      const jugadores = partidaRef.data().jugadores;

      if (jugadores?.length >= 2) {
        console.log('La partida ya está completa');
        return;
      }

      jugadores.push(userId);

      await partidaRef.ref.update({ jugadores });

      await firestore()
        .collection('usuarios')
        .doc(userId)
        .update({ partida: partidaId });

      navigation.navigate('Game', { partidaId });
    } catch (error) {
      console.error(error);
    }
  };
  // Función para obtener los nombres de los usuarios correspondientes a los uid


// ...

// Función para renderizar cada partida




  const selectRandomUser = () => {
    const creatorId = user.uid
    // Filtrar todos los usuarios para excluir al creador
    const otherUsers = usuarios.filter(user => user.uid !== creatorId);
  
    // Seleccionar un usuario aleatorio de la lista filtrada
    const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
  
    // Establecer una nueva partida entre el creador y el usuario seleccionado
    jugadores = [creatorId, randomUser.uid]
    
  
    return dispatch(crearPartida('old game',jugadores))
  };
  
  return (
    <View>
      <Text style={{ color: '#000' }}>Partidas abiertas:</Text>
    

      <Text style={{ color: '#000' }}>Usuarios:</Text>
        <FlatList
        data={usuarios}
        renderItem={({ item }) => <Text style={{ color: '#000' }}>{item.displayName}</Text>}
        keyExtractor={usuarios.uid}
        extraData={usuarios}
        />
        <Text style={{ color: '#000' }}>Crear nueva partida:</Text>
        <Button title="Crear" onPress={() => selectRandomUser()} />
        <Text style={{ color: '#000' }}>Unirse a partida seleccionada:</Text>
        {partidaSeleccionada ? (
        <Button title="Unirse" onPress={() => unirsePartida()} />
        ) : (
        <Text style={{ color: '#000' }}>Seleccione una partida para unirse</Text>
        )}
        </View>
        );
        };
        
        export default SelectGame;
