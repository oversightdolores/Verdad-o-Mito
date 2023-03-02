import React,{useEffect,useState} from 'react';
import {Alert,FlatList,Image,StyleSheet,Text,TouchableOpacity,TouchableWithoutFeedback,View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useAuth0} from 'react-native-auth0';
import {useDispatch,useSelector} from 'react-redux';
import {io} from "socket.io-client";
import BtnMenu from '../components/BtnMenu';
import HeaderBar from '../components/HeaderBar';
import {setPartidaSeleccionada} from '../redux/reducer';
const PartidasList = () => {
    const partidas = useSelector(state => state.partidas)
    const partidasSelec = useSelector(state => state.setPartidaSeleccionada)
    const user = useSelector(state => state.user)
    const usuarios = useSelector(state => state.users)
    const dispatch = useDispatch()

    const obtenerNombres =(uidJugadores) => {
        const nameUser =  usuarios?.filter(usuario => uidJugadores && uidJugadores.includes(usuario.uid))
           .map((usuario) => usuario.displayName);
     
           return nameUser
       };
       
      
       const renderPartida = ({ item }) => {
         const nombresJugadores =  obtenerNombres(item?.jugadores);
         const nombreJugador1 = nombresJugadores[0]|| 'Jugador 1';
         const nombreJugador2 = nombresJugadores[1] || 'Jugador 2';
         return (
           <TouchableOpacity
             style={{
               borderWidth: 1,
               borderColor: 'black',
               borderRadius: 8,
               padding: 10,
               marginVertical: 5,
               height:120,
               margin:10
             }}
             onPress={() => dispatch(setPartidaSeleccionada(item))}
           >
             <Text style={{ color: '#000' }}>{item?.nombre}</Text>
             <Text style={{ color: '#000' }}>Jugadores: </Text>
             <Text style={{ color: '#a55' }}>{nombreJugador1}</Text>
             <Text style={{ color: '#000' }}> vs </Text>
             <Text style={{ color: '#a55' }}>{nombreJugador2}</Text>
           </TouchableOpacity>
         );
       };
    
  return (
    <>
      <FlatList
        horizontal={true}
        data={partidas}
        renderItem={renderPartida}
        keyExtractor={(partida) => partida.id}
        extraData={partidas}
      />

    </>
  )
}

export default PartidasList